# Aaj Kya Banega - Backend

Firebase Cloud Functions for the Aaj Kya Banega meal planning app.

## Features

- **Auto-scheduler** - Automatically schedules meals based on family's configured meal times
- **Smart dish selection** - Combines 60 static dishes with family's custom dishes
- **Fisher-Yates shuffle** - True randomization for fair dish selection
- **Family-specific schedules** - Each family can have their own meal times and scheduler offsets
- **100% Free** - Works on Firebase Spark (free) plan ✅

## Tech Stack

- **Vercel Serverless Functions** - Completely free serverless platform ✅
- **GitHub Actions** - Free cron scheduler (triggers every 15 minutes)
- **TypeScript** - Type safety
- **Firebase Firestore** - Database
- **Firebase Admin SDK** - Server-side Firebase access

## Architecture

```
GitHub Actions (Free Cron)
        ↓ Every 15 minutes
Vercel Serverless Function (Free!)
        ↓ Auto-schedule meals
    Firebase Firestore
        ↓
Frontend displays scheduled dishes
```

**Why Vercel + GitHub Actions?**
- Firebase Cloud Functions require Blaze (paid) plan
- Vercel provides 100K free function invocations/month ✅
- GitHub Actions provides free cron scheduling (2,000 min/month) ✅
- Both services remain free for home use
- Total cost: **$0/month** 🎉

## Project Structure

```
.github/
└── workflows/
    └── auto-scheduler.yml  # GitHub Actions workflow (runs every 15 mins)

api/
└── auto-schedule.ts        # Vercel serverless function (called by GitHub Actions)

src/
└── index.ts                # Firebase Functions (optional, not used for free plan)

vercel.json                 # Vercel configuration
DEPLOYMENT.md               # Step-by-step deployment guide
```

## Getting Started

### Prerequisites
- Node.js 18+
- Vercel account (free): https://vercel.com
- Firebase project (Spark free plan works! ✅)
- GitHub repository (for GitHub Actions)
- Firebase service account credentials (see DEPLOYMENT.md)

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

### Deployment

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions!**

Quick overview:
1. Deploy to Vercel (via dashboard or CLI)
2. Add Firebase credentials as environment variables in Vercel
3. Update GitHub Actions workflow with your Vercel URL
4. Push to GitHub - Auto-scheduler starts running!

```bash
# Quick deploy via Vercel CLI
npm install -g vercel
vercel login
vercel
```

**Cost: $0/month** ✅

## API Endpoints

### `/api/auto-schedule` (POST)
- **Platform**: Vercel Serverless Function
- **Trigger**: GitHub Actions every 15 minutes
- **URL**: `https://[your-project].vercel.app/api/auto-schedule`
- **Purpose**: Automatically schedules meals for all families based on their individual meal configs
- **Cost**: $0 - Free tier (100K invocations/month) ✅

**Response:**
```json
{
  "success": true,
  "message": "Processed 1 families",
  "timestamp": "2026-03-15T12:00:00.000Z"
}
```

## How the Auto-Scheduler Works

1. **GitHub Actions** triggers every 15 minutes (free cron service)
2. GitHub Actions sends HTTP POST to Vercel serverless function
3. Vercel function fetches all families from Firebase Firestore
4. For each family, for each meal slot:
   - Reads their `mealConfig` (breakfast, lunch, dinner times and offsets)
   - Checks if dish already scheduled (by user or previous run) → **SKIP** ⏭️
   - Checks if current time is within the scheduling window
   - If yes, selects a random dish from the combined pool:
     - 20 static dishes for the meal slot
     - Family's custom dishes (excluding duplicates)
   - Creates a `mealSlot` document in Firestore with the scheduled dish
   - All future runs skip this slot automatically ✅

**Efficiency**: Once ANY dish is selected (user or auto), that meal slot is skipped in all future runs. No wasted processing!

**Cost Breakdown**:
- GitHub Actions: 2,000 minutes/month free → We use ~240 minutes/month ✅
- Vercel Functions: 100,000 invocations/month free → We use ~2,880/month ✅
- Firebase Firestore: 50,000 reads/day free → We use ~200/day ✅
- **Total: $0/month** 🎉

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
