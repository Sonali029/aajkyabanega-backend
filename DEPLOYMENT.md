# Deployment Guide - Vercel (Free!)

This guide walks you through deploying the auto-scheduler to Vercel for **$0/month**.

## 🎯 Overview

```
GitHub Actions (Free Cron)
        ↓ Every 15 minutes
Vercel Serverless Function (Free!)
        ↓ Auto-schedule meals
    Firebase Firestore
        ↓
Frontend displays dishes
```

---

## 📋 Prerequisites

1. **Vercel Account** (Free)
   - Sign up at https://vercel.com
   - Connect your GitHub account

2. **Firebase Service Account Credentials**
   - Go to Firebase Console
   - Project Settings → Service Accounts
   - Generate new private key (downloads JSON file)

---

## 🚀 Step-by-Step Deployment

### **Step 1: Get Firebase Credentials**

1. Open Firebase Console: https://console.firebase.google.com
2. Select your project: `aaj-kya-banega-5e78a`
3. Click ⚙️ (Settings) → **Project Settings**
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Download the JSON file (keep it safe!)

The JSON file looks like:
```json
{
  "type": "service_account",
  "project_id": "aaj-kya-banega-5e78a",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@aaj-kya-banega-5e78a.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

---

### **Step 2: Deploy to Vercel**

#### **Option A: Deploy via Vercel Dashboard (Easiest)**

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository: `aajkyabanega-backend`
4. Click **Import**
5. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (default)
   - Click **Deploy**

#### **Option B: Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from the backend directory
cd /Users/achin.sood@zomato.com/Desktop/aajkyabanega-backend
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? aajkyabanega-backend
# - Directory? ./
# - Override settings? No
```

---

### **Step 3: Add Environment Variables to Vercel**

After deployment, add Firebase credentials as environment variables:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these three variables:

| Variable Name | Value | Where to Find |
|--------------|-------|---------------|
| `FIREBASE_PROJECT_ID` | `aaj-kya-banega-5e78a` | From downloaded JSON: `project_id` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-xxxxx@...` | From JSON: `client_email` |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...` | From JSON: `private_key` |

**IMPORTANT for FIREBASE_PRIVATE_KEY:**
- Copy the ENTIRE private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Paste it directly (Vercel handles the newlines)

4. Click **Save**
5. **Redeploy** the project (Settings → Deployments → click the 3 dots → Redeploy)

---

### **Step 4: Update GitHub Actions Workflow**

1. Note your Vercel deployment URL (e.g., `https://aajkyabanega-backend.vercel.app`)
2. Update `.github/workflows/auto-scheduler.yml`:

```yaml
# Find this line:
https://YOUR_VERCEL_PROJECT.vercel.app/api/auto-schedule

# Replace with your actual URL:
https://aajkyabanega-backend.vercel.app/api/auto-schedule
```

3. Commit and push the change:

```bash
git add .github/workflows/auto-scheduler.yml
git commit -m "Update GitHub Actions with Vercel URL"
git push origin main
```

---

### **Step 5: Test the Setup**

#### **Manual Test (via browser/curl)**

```bash
# Test the endpoint
curl -X POST https://aajkyabanega-backend.vercel.app/api/auto-schedule

# Should return:
# {
#   "success": true,
#   "message": "Processed X families",
#   "timestamp": "2026-03-15T..."
# }
```

#### **Test GitHub Actions**

1. Go to your GitHub repository
2. Click **Actions** tab
3. Click **Auto-Schedule Meals** workflow
4. Click **Run workflow** → **Run workflow**
5. Watch the logs to confirm it works!

---

## 📊 Monitoring

### **View Logs**

**Vercel Logs:**
1. Go to Vercel dashboard
2. Select your project
3. Click **Logs** tab
4. Filter by function: `/api/auto-schedule`

**GitHub Actions Logs:**
1. Go to GitHub repository
2. Click **Actions** tab
3. Click on any workflow run
4. View logs for each step

---

## 💰 Cost Breakdown (Free!)

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| **Vercel Functions** | 100K invocations/month | ~2,880/month | $0 ✅ |
| **GitHub Actions** | 2,000 minutes/month | ~240 minutes/month | $0 ✅ |
| **Firebase Firestore** | 50K reads/day | ~200/day | $0 ✅ |
| **Total** | - | - | **$0/month** 🎉 |

---

## 🛠️ Troubleshooting

### **Issue: Function returns 500 error**

**Solution:** Check environment variables
1. Verify all 3 env vars are set correctly in Vercel
2. Make sure `FIREBASE_PRIVATE_KEY` includes the full key with headers
3. Redeploy after changing env vars

### **Issue: "Permission denied" error**

**Solution:** Firebase service account needs permissions
1. Go to Firebase Console → IAM & Admin
2. Find your service account email
3. Add role: **Firebase Admin**

### **Issue: GitHub Actions says "YOUR_VERCEL_PROJECT"**

**Solution:** Update the workflow file
1. Edit `.github/workflows/auto-scheduler.yml`
2. Replace placeholder URL with your actual Vercel URL
3. Commit and push

---

## ✅ Verification Checklist

- [ ] Vercel project deployed successfully
- [ ] All 3 environment variables added to Vercel
- [ ] Manual test of `/api/auto-schedule` endpoint works
- [ ] GitHub Actions workflow URL updated with Vercel URL
- [ ] GitHub Actions workflow runs successfully
- [ ] Check Firestore to see if meals are being scheduled
- [ ] Frontend displays auto-scheduled dishes

---

## 🔄 Redeployment

If you make code changes:

```bash
# Via Vercel CLI
cd /Users/achin.sood@zomato.com/Desktop/aajkyabanega-backend
vercel --prod

# Or via Git
git add .
git commit -m "Your changes"
git push origin main
# Vercel auto-deploys from GitHub!
```

---

## 📞 Need Help?

If something doesn't work:
1. Check Vercel logs
2. Check GitHub Actions logs
3. Verify Firebase service account permissions
4. Test the endpoint manually first

---

**You're all set! Auto-scheduling is now running 100% free on Vercel!** 🎉
