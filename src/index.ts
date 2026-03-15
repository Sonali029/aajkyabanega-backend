import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();

interface MealSlotConfig {
  time: string; // "HH:mm" format
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

// Static dishes - copied from your app
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

/**
 * Fisher-Yates shuffle for true randomness
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Calculate scheduler time based on meal time and offset
 */
function getSchedulerTime(mealTime: string, offsetMins: number): Date {
  const [hours, mins] = mealTime.split(':').map(Number);
  const now = new Date();
  const mealDateTime = new Date(now);
  mealDateTime.setHours(hours, mins, 0, 0);

  // Subtract offset
  const schedulerTime = new Date(mealDateTime.getTime() - offsetMins * 60 * 1000);
  return schedulerTime;
}

/**
 * Check if we should auto-schedule for a given slot
 *
 * Example scenario:
 * - Breakfast time: 8:00 AM
 * - Scheduler offset: 120 minutes (2 hours before)
 * - Scheduler time: 6:00 AM
 *
 * Timeline (if user hasn't selected):
 * - 5:59 AM → Scheduler checks → Too early, skip
 * - 6:00 AM → Scheduler checks → ✅ Picks random dish, saves to Firestore
 * - 6:15 AM → Scheduler checks → Sees dish already scheduled, SKIP ⏭️
 * - 6:30 AM → Scheduler checks → Sees dish already scheduled, SKIP ⏭️
 * - 7:00 AM → Scheduler checks → Sees dish already scheduled, SKIP ⏭️
 * - 8:00 AM → Meal time passed, skip
 *
 * Timeline (if user selects at 5:30 AM):
 * - 6:00 AM → Scheduler checks → Sees user's dish, SKIP ⏭️
 * - 6:15 AM → Scheduler checks → Sees user's dish, SKIP ⏭️
 * - All future checks → SKIP ⏭️
 *
 * IMPORTANT: Once ANY dish is selected (by user OR scheduler), this slot is
 * automatically skipped in all future runs. No wasted processing! ✅
 */
function shouldAutoSchedule(
  slotConfig: MealSlotConfig,
  currentScheduledDishId: string | undefined
): boolean {
  if (!slotConfig.enabled) return false;
  if (currentScheduledDishId) return false; // ⏭️ SKIP if already scheduled (by user OR previous auto-schedule)

  const now = new Date();
  const schedulerTime = getSchedulerTime(slotConfig.time, slotConfig.schedulerOffsetMins);

  // Parse meal time
  const [hours, mins] = slotConfig.time.split(':').map(Number);
  const mealTime = new Date(now);
  mealTime.setHours(hours, mins, 0, 0);

  // Should schedule if: scheduler time has passed AND meal time hasn't passed
  return now >= schedulerTime && now < mealTime;
}

/**
 * Get today's date in yyyy-MM-dd format
 */
function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Auto-schedule a dish for a meal slot
 */
async function autoScheduleDishForFamily(
  familyId: string,
  slot: 'breakfast' | 'lunch' | 'dinner',
  familyDishes: Dish[]
): Promise<void> {
  const today = getTodayDateString();
  const slotId = `${today}_${slot}`;

  // Check if already scheduled
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

  // Get static dishes for this slot
  const staticEligible = STATIC_DISHES.filter((d) => d.mealSlots.includes(slot));

  // Get family dishes for this slot
  const familyEligible = familyDishes.filter((d) => d.mealSlots.includes(slot));

  // Create set of static dish names (lowercase)
  const staticDishNames = new Set(
    staticEligible.map((d) => d.name.toLowerCase().trim())
  );

  // Filter family dishes to get only unique ones
  const uniqueFamilyDishes = familyEligible.filter(
    (d) => !staticDishNames.has(d.name.toLowerCase().trim())
  );

  // Combine all dishes
  const allDishes: Array<{ id: string; name: string; source: 'static' | 'family' }> = [
    // Add all static dishes
    ...staticEligible.map((d) => ({
      id: `static_${d.name}`,
      name: d.name,
      source: 'static' as const,
    })),
    // Add unique family dishes
    ...uniqueFamilyDishes.map((d) => ({
      id: d.id,
      name: d.name,
      source: 'family' as const,
    })),
  ];

  if (allDishes.length === 0) {
    console.error(`❌ ${familyId}/${slotId} - No dishes available`);
    return;
  }

  // Shuffle and pick
  const shuffled = shuffleArray(allDishes);
  const selectedDish = shuffled[0];

  // Schedule the dish
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
  console.log(`   Pool: ${allDishes.length} total (${staticEligible.length} static + ${uniqueFamilyDishes.length} unique family)`);
}

/**
 * Process auto-scheduling for a single family
 */
async function processFamilyScheduling(familyId: string): Promise<void> {
  try {
    // Get family data
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

    // Get family dishes
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

    // Check each meal slot
    for (const slot of ['breakfast', 'lunch', 'dinner'] as const) {
      const slotConfig = mealConfig[slot];
      const slotId = `${today}_${slot}`;

      // Get current meal slot data
      const mealSlotDoc = await db
        .collection('families')
        .doc(familyId)
        .collection('mealSlots')
        .doc(slotId)
        .get();

      const scheduledDishId = mealSlotDoc.exists ? mealSlotDoc.data()?.scheduledDishId : undefined;

      // Check if we should auto-schedule
      if (shouldAutoSchedule(slotConfig, scheduledDishId)) {
        console.log(`🎲 ${familyId} - ${slot} needs scheduling (meal at ${slotConfig.time}, offset ${slotConfig.schedulerOffsetMins} mins)`);
        await autoScheduleDishForFamily(familyId, slot, familyDishes);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing family ${familyId}:`, error);
  }
}

/**
 * Scheduled function - runs every 15 minutes
 *
 * HOW IT WORKS:
 * - Runs every 15 minutes (this is just the "check" frequency to scan all families)
 * - For each family, checks each meal slot (breakfast, lunch, dinner)
 * - Each family has configured meal times in their mealConfig:
 *   Example: { breakfast: { time: "08:00", schedulerOffsetMins: 120, enabled: true } }
 *
 * SCHEDULING LOGIC:
 * - Auto-schedules a random dish ONLY if ALL conditions are met:
 *   1. Current time >= scheduler time (meal time - offset) [e.g., 6:00 AM for 8:00 AM breakfast]
 *   2. Current time < meal time [e.g., before 8:00 AM]
 *   3. No dish is already selected (by user OR previous auto-schedule)
 *
 * EFFICIENCY OPTIMIZATIONS:
 * 1. Smart polling: Skips during inactive hours (10 PM - 5 AM IST)
 *    - Saves ~30% of invocations
 *    - Nobody schedules meals at 2 AM anyway!
 * 2. Skip already-scheduled slots: Once a dish is selected → slot is SKIPPED in all future runs ⏭️
 *    - Example: Breakfast scheduled at 6:00 AM → all checks at 6:15, 6:30, 6:45... skip it
 *    - Very fast: just reads mealSlot document, sees scheduledDishId exists, skips
 * 3. Parallel processing: All families processed concurrently for speed
 *
 * DISH SELECTION:
 * - Selects random dish from pool of: 20 static dishes + family's custom dishes
 * - Uses Fisher-Yates shuffle for true randomness
 * - Saves to Firestore with autoScheduled: true flag
 */
export const autoScheduleMeals = functions.pubsub
  .schedule('every 15 minutes')
  .timeZone('Asia/Kolkata') // Indian Standard Time
  .onRun(async (context) => {
    console.log('🚀 Auto-scheduler triggered at:', new Date().toISOString());

    // Smart polling: Skip during inactive hours (10 PM - 5 AM IST)
    // This saves ~30% of invocations without affecting functionality
    const now = new Date();
    const hour = now.getHours(); // Note: Cloud Functions in Asia/Kolkata timezone

    if (hour < 5 || hour >= 22) {
      console.log(`⏭️ Skipping - outside active hours (current: ${hour}:00 IST, active: 5:00-22:00)`);
      return; // Exit early, no processing needed
    }

    try {
      // Get all families
      const familiesSnapshot = await db.collection('families').get();
      console.log(`📊 Processing ${familiesSnapshot.size} families`);

      // Process each family in parallel
      const promises = familiesSnapshot.docs.map((doc) =>
        processFamilyScheduling(doc.id)
      );

      await Promise.all(promises);

      console.log('✅ Auto-scheduler completed successfully');
    } catch (error) {
      console.error('❌ Auto-scheduler error:', error);
      throw error;
    }
  });

/**
 * Manual trigger function for testing
 * Call this from Firebase Console or your app to test scheduling
 */
export const triggerAutoScheduler = functions.https.onCall(async (data, context) => {
  // Optional: Add auth check
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  // }

  console.log('🧪 Manual trigger requested');

  try {
    const familiesSnapshot = await db.collection('families').get();
    console.log(`📊 Processing ${familiesSnapshot.size} families`);

    const promises = familiesSnapshot.docs.map((doc) =>
      processFamilyScheduling(doc.id)
    );

    await Promise.all(promises);

    return {
      success: true,
      message: `Processed ${familiesSnapshot.size} families`,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('❌ Manual trigger error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
