import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';
import { CUISINE_DISHES, CuisineDish, getAllDishesWithCuisine } from '../utils/cuisineDishes';
import { filterDishes } from '../utils/dishFilters';

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// Types
interface MealSlotConfig {
  time: string;
  schedulerOffsetMins: number;
  enabled: boolean;
}

interface MealConfig {
  breakfast: MealSlotConfig;
  lunch: MealSlotConfig;
  dinner: MealSlotConfig;
}

type FoodPreference = 'veg' | 'veg-egg' | 'all';
type DishFoodType = 'veg' | 'egg' | 'non-veg';
type CuisineType =
  | 'punjabi'
  | 'south-indian'
  | 'north-indian'
  | 'street-food'
  | 'chinese'
  | 'italian'
  | 'continental'
  | 'bengali'
  | 'gujarati'
  | 'maharashtrian'
  | 'hyderabadi'
  | 'kashmiri'
  | 'rajasthani'
  | 'mughlai'
  | 'kerala'
  | 'karnataka'
  | 'goan';

interface Family {
  id: string;
  name: string;
  mealConfig: MealConfig;
  foodPreference: FoodPreference;
  primaryCuisine?: CuisineType;
  location?: string;
}

interface Dish {
  id: string;
  name: string;
  mealSlots: string[];
}


// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get scheduler time (in IST timezone - UTC+5:30)
function getSchedulerTime(mealTime: string, offsetMins: number): Date {
  const [hours, mins] = mealTime.split(':').map(Number);

  // Get current time in IST (UTC+5:30)
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
  const istTime = new Date(now.getTime() + istOffset);

  // Create meal time for today in IST
  const mealDateTime = new Date(istTime);
  mealDateTime.setUTCHours(hours, mins, 0, 0);

  // Calculate scheduler time (meal time - offset)
  const schedulerTime = new Date(mealDateTime.getTime() - offsetMins * 60 * 1000);
  return schedulerTime;
}

// Check if should auto-schedule
function shouldAutoSchedule(
  slotConfig: MealSlotConfig,
  currentScheduledDishId: string | undefined
): boolean {
  if (!slotConfig.enabled) {
    console.log(`  ⏭️ Slot disabled in config`);
    return false;
  }
  if (currentScheduledDishId) {
    console.log(`  ⏭️ Already scheduled: ${currentScheduledDishId}`);
    return false;
  }

  // Get current time in IST
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset);

  const schedulerTime = getSchedulerTime(slotConfig.time, slotConfig.schedulerOffsetMins);

  console.log(`  📅 Current time (UTC): ${now.toISOString()}`);
  console.log(`  📅 Current time (IST): ${istNow.toISOString()}`);
  console.log(`  ⏰ Scheduler time: ${schedulerTime.toISOString()}`);
  console.log(`  ⏰ Meal time: ${slotConfig.time}`);
  console.log(`  ⏰ Offset: ${slotConfig.schedulerOffsetMins} min`);
  console.log(`  🔍 Should schedule? ${istNow >= schedulerTime}`);

  // Schedule if scheduler time has arrived (anytime after offset time on the same day)
  // This means: once it's 7 AM (breakfast scheduler time), breakfast stays schedulable all day
  // User can open app at any time (8 AM, 2 PM, 11 PM) and see all meals scheduled for today
  return istNow >= schedulerTime;
}

// Get today's date string
function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Auto-schedule dish for family
async function autoScheduleDishForFamily(
  familyId: string,
  slot: 'breakfast' | 'lunch' | 'dinner',
  familyDishes: Dish[]
): Promise<boolean> {
  const today = getTodayDateString();
  const slotId = `${today}_${slot}`;

  const slotDoc = await db
    .collection('families')
    .doc(familyId)
    .collection('mealSlots')
    .doc(slotId)
    .get();

  if (slotDoc.exists && slotDoc.data()?.scheduledDishId) {
    console.log(`⏭️ ${familyId}/${slotId} - Already scheduled`);
    return false;
  }

  // STEP 1: Check for nominations
  const nominationsSnapshot = await db
    .collection('families')
    .doc(familyId)
    .collection('mealSlots')
    .doc(slotId)
    .collection('nominations')
    .get();

  let selectedDish: { id: string; name: string; source: 'static' | 'family' } | null = null;

  if (!nominationsSnapshot.empty) {
    // Nominations exist - pick based on votes
    console.log(`📋 ${familyId}/${slotId} - Found ${nominationsSnapshot.size} nominations`);

    interface NominationWithVotes {
      dishId?: string;
      dishName?: string;
      voteCount: number;
    }

    const nominationsWithVotes: NominationWithVotes[] = nominationsSnapshot.docs.map((doc) => {
      const data = doc.data();
      const votes = data.votes || {};
      const voteCount = Object.keys(votes).length;
      return {
        dishId: data.dishId,
        dishName: data.dishName,
        voteCount,
      };
    });

    // Find max votes
    const maxVotes = Math.max(...nominationsWithVotes.map((n) => n.voteCount));
    console.log(`🗳️ ${familyId}/${slotId} - Max votes: ${maxVotes}`);

    // Get all nominations with max votes (for tie-breaking)
    const topNominations = nominationsWithVotes.filter((n) => n.voteCount === maxVotes);

    // Pick randomly from top nominations (handles ties)
    const shuffledTop = shuffleArray(topNominations);
    const winner = shuffledTop[0];

    if (winner.dishId) {
      // Family dish
      const dish = familyDishes.find((d) => d.id === winner.dishId);
      if (dish) {
        selectedDish = { id: dish.id, name: dish.name, source: 'family' };
      }
    } else if (winner.dishName) {
      // Static dish
      selectedDish = {
        id: `static_${winner.dishName}`,
        name: winner.dishName,
        source: 'static',
      };
    }

    if (selectedDish) {
      console.log(
        `🏆 ${familyId}/${slotId} - Selected from nominations: ${selectedDish.name} (${maxVotes} votes)`
      );
    }
  }

  // STEP 2: If no nominations or selection failed, pick randomly from all dishes
  if (!selectedDish) {
    console.log(`🎲 ${familyId}/${slotId} - No nominations, picking random dish`);

    // Get all cuisine dishes with cuisine tags
    const allCuisineDishes = getAllDishesWithCuisine();

    // Filter cuisine dishes by meal slot, food preference, and primary cuisine
    const cuisineDishesFiltered = allCuisineDishes.filter(d => d.mealSlots.includes(slot));
    const cuisineDishesFilteredByPreference = family.foodPreference && family.primaryCuisine
      ? filterDishes(cuisineDishesFiltered, family.foodPreference, family.primaryCuisine)
      : cuisineDishesFiltered;

    console.log(`📊 ${familyId}/${slotId} - Filtered cuisine dishes: ${cuisineDishesFilteredByPreference.length} (from ${allCuisineDishes.length} total, foodPref: ${family.foodPreference}, cuisine: ${family.primaryCuisine})`);

    // Also filter family dishes by meal slot
    const familyEligible = familyDishes.filter((d) => d.mealSlots.includes(slot));

    const allDishes: Array<{ id: string; name: string; source: 'static' | 'family' }> = [
      ...familyEligible.map((d) => ({ id: d.id, name: d.name, source: 'family' as const })),
      ...cuisineDishesFilteredByPreference.map((d) => ({
        id: `static_${d.name}`,
        name: d.name,
        source: 'static' as const
      })),
    ];

    if (allDishes.length === 0) {
      console.error(`❌ ${familyId}/${slotId} - No dishes available after filtering`);
      return false;
    }

    const shuffled = shuffleArray(allDishes);
    selectedDish = shuffled[0];
  }

  // STEP 3: Schedule the selected dish
  await db
    .collection('families')
    .doc(familyId)
    .collection('mealSlots')
    .doc(slotId)
    .set(
      {
        date: today,
        slot,
        scheduledDishId: selectedDish.id,
        scheduledDishName: selectedDish.name,
        scheduledAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'scheduled',
        autoScheduled: true,
        source: selectedDish.source,
      },
      { merge: true }
    );

  console.log(`✅ ${familyId}/${slotId} - Auto-scheduled: ${selectedDish.name} (${selectedDish.source})`);
  return true;
}

// Process family scheduling
async function processFamilyScheduling(familyId: string): Promise<string[]> {
  const scheduledSlots: string[] = [];
  try {
    const familyDoc = await db.collection('families').doc(familyId).get();
    if (!familyDoc.exists) {
      console.log(`⚠️ Family ${familyId} not found`);
      return scheduledSlots;
    }

    const familyData = familyDoc.data() as Family;
    const mealConfig = familyData.mealConfig;

    if (!mealConfig) {
      console.log(`⚠️ Family ${familyId} has no meal config`);
      return scheduledSlots;
    }

    const dishesSnapshot = await db
      .collection('families')
      .doc(familyId)
      .collection('dishes')
      .get();

    const familyDishes: Dish[] = dishesSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      mealSlots: doc.data().mealSlots || [],
    }));

    const today = getTodayDateString();

    for (const slot of ['breakfast', 'lunch', 'dinner'] as const) {
      const slotConfig = mealConfig[slot];
      const slotId = `${today}_${slot}`;

      console.log(`\n🔍 Checking ${slot.toUpperCase()}:`);

      const mealSlotDoc = await db
        .collection('families')
        .doc(familyId)
        .collection('mealSlots')
        .doc(slotId)
        .get();

      const scheduledDishId = mealSlotDoc.exists ? mealSlotDoc.data()?.scheduledDishId : undefined;

      if (shouldAutoSchedule(slotConfig, scheduledDishId)) {
        console.log(`🎲 ${familyId} - ${slot} needs scheduling`);
        const wasScheduled = await autoScheduleDishForFamily(familyId, slot, familyDishes);
        if (wasScheduled) {
          scheduledSlots.push(slot);
        }
      } else {
        console.log(`⏭️ ${familyId} - ${slot} skipped`);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing family ${familyId}:`, error);
  }
  return scheduledSlots;
}

// Main Vercel handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('🚀 Auto-scheduler triggered at:', new Date().toISOString());

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const familiesSnapshot = await db.collection('families').get();
    console.log(`📊 Processing ${familiesSnapshot.size} families`);

    const promises = familiesSnapshot.docs.map((doc) => processFamilyScheduling(doc.id));
    const results = await Promise.all(promises);

    // Aggregate all scheduled slots across all families
    const allScheduledSlots = results.flat();
    const uniqueScheduledSlots = [...new Set(allScheduledSlots)];

    console.log('✅ Auto-scheduler completed successfully');
    console.log(`📋 Scheduled meals: ${uniqueScheduledSlots.join(', ') || 'none'}`);

    return res.status(200).json({
      success: true,
      message: `Processed ${familiesSnapshot.size} families`,
      scheduledSlots: uniqueScheduledSlots,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('❌ Auto-scheduler error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
