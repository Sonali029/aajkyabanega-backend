# Aaj Kya Banega - Backend

Firebase Cloud Functions for the Aaj Kya Banega meal planning app.

## Features

- **Auto-scheduler** - Automatically schedules meals based on family's configured meal times
- **Smart dish selection** - Combines 60 static dishes with family's custom dishes
- **Fisher-Yates shuffle** - True randomization for fair dish selection
- **Family-specific schedules** - Each family can have their own meal times and scheduler offsets

## Tech Stack

- **Firebase Cloud Functions** - Serverless functions
- **TypeScript** - Type safety
- **Firestore** - Database integration
- **Pub/Sub** - Scheduled triggers (every 30 minutes)

## Project Structure

```
src/
└── index.ts          # Cloud Functions definitions
    ├── autoScheduleMeals       - Scheduled function (every 30 mins)
    └── triggerAutoScheduler    - Manual trigger for testing
```

## Getting Started

### Prerequisites
- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Firebase project with Blaze plan (required for Cloud Functions)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sonali029/aajkyabanega-backend.git
cd aajkyabanega-backend
```

2. Install dependencies:
```bash
npm install
```

3. Login to Firebase:
```bash
firebase login
```

4. Set your Firebase project:
```bash
firebase use <your-project-id>
```

### Development

Build TypeScript:
```bash
npm run build
```

Run locally with Firebase emulator:
```bash
firebase emulators:start
```

### Deployment

Deploy to Firebase:
```bash
firebase deploy --only functions
```

Deploy specific function:
```bash
firebase deploy --only functions:autoScheduleMeals
```

## Functions

### autoScheduleMeals
- **Trigger**: Scheduled (every 15 minutes)
- **Active Hours**: 5:00 AM - 10:00 PM IST (skips overnight hours for efficiency)
- **Timezone**: Asia/Kolkata (IST)
- **Purpose**: Automatically schedules meals for all families based on their individual meal configs

### triggerAutoScheduler
- **Trigger**: HTTPS Callable
- **Purpose**: Manual trigger for testing the scheduler
- **Usage**: Call from Firebase Console or your app

## How the Auto-Scheduler Works

1. Runs every 15 minutes (during active hours: 5 AM - 10 PM IST)
2. Smart polling: Skips overnight hours (10 PM - 5 AM) saving ~30% of invocations
3. Fetches all families from Firestore
4. For each family, for each meal slot:
   - Reads their `mealConfig` (breakfast, lunch, dinner times and offsets)
   - Checks if dish already scheduled (by user or previous run) → **SKIP** ⏭️
   - Checks if current time is within the scheduling window
   - If yes, selects a random dish from the combined pool:
     - 20 static dishes for the meal slot
     - Family's custom dishes (excluding duplicates)
   - Creates a `mealSlot` document with the scheduled dish
   - All future runs skip this slot automatically ✅

**Efficiency**: Once ANY dish is selected (user or auto), that meal slot is skipped in all future runs. No wasted processing!

## Dish Selection Logic

The scheduler combines two pools:
- **Static dishes**: 60 pre-defined popular Indian dishes (20 per meal)
- **Family dishes**: Custom dishes added by the family

Duplicates are removed (case-insensitive matching), ensuring maximum variety.

## Frontend Repository

The React frontend is in a separate repository:
- [aajkyabanega](https://github.com/Sonali029/aajkyabanega)

## Environment

- **Runtime**: Node.js 18
- **Region**: Default (us-central1)
- **Timezone**: Asia/Kolkata (IST)

## Monitoring

View function logs:
```bash
firebase functions:log
```

Or in Firebase Console: Functions → Logs
