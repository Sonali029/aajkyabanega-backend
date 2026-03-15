import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';

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

interface Family {
  id: string;
  name: string;
  mealConfig: MealConfig;
}

interface Dish {
  id: string;
  name: string;
  mealSlots: string[];
}

interface StaticDish {
  name: string;
  mealSlots: string[];
  isVeg: boolean;
}

// Static dishes (60 total - 20 per meal)
const STATIC_DISHES: StaticDish[] = [
  // Breakfast (20 dishes)
  { name: 'Aloo Paratha', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Gobi Paratha', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Paneer Paratha', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Chole Bhature', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Poha', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Puri Bhaji', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Bread Pakora', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Besan Chilla', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Moong Dal Chilla', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Amritsari Kulcha', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Methi Paratha', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Upma', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Idli Sambar', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Masala Dosa', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Medu Vada', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Uttapam', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Macaroni', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Sandwich', mealSlots: ['breakfast'], isVeg: true },
  { name: 'Omelette Bread', mealSlots: ['breakfast'], isVeg: false },
  { name: 'Boiled Eggs', mealSlots: ['breakfast'], isVeg: false },

  // Lunch (20 dishes)
  { name: 'Rajma Chawal', mealSlots: ['lunch'], isVeg: true },
  { name: 'Kadhi Pakora', mealSlots: ['lunch'], isVeg: true },
  { name: 'Dal Makhani', mealSlots: ['lunch'], isVeg: true },
  { name: 'Kadai Paneer', mealSlots: ['lunch'], isVeg: true },
  { name: 'Matar Paneer', mealSlots: ['lunch'], isVeg: true },
  { name: 'Bhindi Masala', mealSlots: ['lunch'], isVeg: true },
  { name: 'Sarson Ka Saag & Makki Roti', mealSlots: ['lunch'], isVeg: true },
  { name: 'Chana Masala', mealSlots: ['lunch'], isVeg: true },
  { name: 'Jeera Rice & Dal Tadka', mealSlots: ['lunch'], isVeg: true },
  { name: 'Aloo Gobi', mealSlots: ['lunch'], isVeg: true },
  { name: 'Baingan Bharta', mealSlots: ['lunch'], isVeg: true },
  { name: 'Lauki Ki Sabji', mealSlots: ['lunch'], isVeg: true },
  { name: 'Tinda Masala', mealSlots: ['lunch'], isVeg: true },
  { name: 'Karela Pyaz', mealSlots: ['lunch'], isVeg: true },
  { name: 'Mix Veg', mealSlots: ['lunch'], isVeg: true },
  { name: 'Tari Wale Aloo', mealSlots: ['lunch'], isVeg: true },
  { name: 'Arbi Masala', mealSlots: ['lunch'], isVeg: true },
  { name: 'Kathal', mealSlots: ['lunch'], isVeg: true },
  { name: 'Chicken Curry', mealSlots: ['lunch'], isVeg: false },
  { name: 'Egg Curry', mealSlots: ['lunch'], isVeg: false },

  // Dinner (20 dishes)
  { name: 'Butter Chicken', mealSlots: ['dinner'], isVeg: false },
  { name: 'Paneer Tikka Masala', mealSlots: ['dinner'], isVeg: true },
  { name: 'Palak Paneer', mealSlots: ['dinner'], isVeg: true },
  { name: 'Malai Kofta', mealSlots: ['dinner'], isVeg: true },
  { name: 'Rogan Josh', mealSlots: ['dinner'], isVeg: false },
  { name: 'Pindi Chole', mealSlots: ['dinner'], isVeg: true },
  { name: 'Mutton Curry', mealSlots: ['dinner'], isVeg: false },
  { name: 'Paneer Bhurji', mealSlots: ['dinner'], isVeg: true },
  { name: 'Keema Matar', mealSlots: ['dinner'], isVeg: false },
  { name: 'Shahi Paneer', mealSlots: ['dinner'], isVeg: true },
  { name: 'Dal Bukhara', mealSlots: ['dinner'], isVeg: true },
  { name: 'Chicken Biryani', mealSlots: ['dinner'], isVeg: false },
  { name: 'Veg Biryani', mealSlots: ['dinner'], isVeg: true },
  { name: 'Soya Chaap Masala', mealSlots: ['dinner'], isVeg: true },
  { name: 'Mushroom Do Pyaza', mealSlots: ['dinner'], isVeg: true },
  { name: 'Fish Curry', mealSlots: ['dinner'], isVeg: false },
  { name: 'Chilli Chicken', mealSlots: ['dinner'], isVeg: false },
  { name: 'Hakka Noodles', mealSlots: ['dinner'], isVeg: true },
  { name: 'Manchurian', mealSlots: ['dinner'], isVeg: true },
  { name: 'Fried Rice', mealSlots: ['dinner'], isVeg: true },
];

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get scheduler time
function getSchedulerTime(mealTime: string, offsetMins: number): Date {
  const [hours, mins] = mealTime.split(':').map(Number);
  const now = new Date();
  const mealDateTime = new Date(now);
  mealDateTime.setHours(hours, mins, 0, 0);
  const schedulerTime = new Date(mealDateTime.getTime() - offsetMins * 60 * 1000);
  return schedulerTime;
}

// Check if should auto-schedule
function shouldAutoSchedule(
  slotConfig: MealSlotConfig,
  currentScheduledDishId: string | undefined
): boolean {
  if (!slotConfig.enabled) return false;
  if (currentScheduledDishId) return false;

  const now = new Date();
  const schedulerTime = getSchedulerTime(slotConfig.time, slotConfig.schedulerOffsetMins);
  const [hours, mins] = slotConfig.time.split(':').map(Number);
  const mealTime = new Date(now);
  mealTime.setHours(hours, mins, 0, 0);

  return now >= schedulerTime && now < mealTime;
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
): Promise<void> {
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
    return;
  }

  const staticEligible = STATIC_DISHES.filter((d) => d.mealSlots.includes(slot));
  const familyEligible = familyDishes.filter((d) => d.mealSlots.includes(slot));
  const staticDishNames = new Set(staticEligible.map((d) => d.name.toLowerCase().trim()));
  const uniqueFamilyDishes = familyEligible.filter(
    (d) => !staticDishNames.has(d.name.toLowerCase().trim())
  );

  const allDishes: Array<{ id: string; name: string; source: 'static' | 'family' }> = [
    ...staticEligible.map((d) => ({ id: `static_${d.name}`, name: d.name, source: 'static' as const })),
    ...uniqueFamilyDishes.map((d) => ({ id: d.id, name: d.name, source: 'family' as const })),
  ];

  if (allDishes.length === 0) {
    console.error(`❌ ${familyId}/${slotId} - No dishes available`);
    return;
  }

  const shuffled = shuffleArray(allDishes);
  const selectedDish = shuffled[0];

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
}

// Process family scheduling
async function processFamilyScheduling(familyId: string): Promise<void> {
  try {
    const familyDoc = await db.collection('families').doc(familyId).get();
    if (!familyDoc.exists) {
      console.log(`⚠️ Family ${familyId} not found`);
      return;
    }

    const familyData = familyDoc.data() as Family;
    const mealConfig = familyData.mealConfig;

    if (!mealConfig) {
      console.log(`⚠️ Family ${familyId} has no meal config`);
      return;
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

      const mealSlotDoc = await db
        .collection('families')
        .doc(familyId)
        .collection('mealSlots')
        .doc(slotId)
        .get();

      const scheduledDishId = mealSlotDoc.exists ? mealSlotDoc.data()?.scheduledDishId : undefined;

      if (shouldAutoSchedule(slotConfig, scheduledDishId)) {
        console.log(`🎲 ${familyId} - ${slot} needs scheduling`);
        await autoScheduleDishForFamily(familyId, slot, familyDishes);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing family ${familyId}:`, error);
  }
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
    await Promise.all(promises);

    console.log('✅ Auto-scheduler completed successfully');

    return res.status(200).json({
      success: true,
      message: `Processed ${familiesSnapshot.size} families`,
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
