# 🤖 Google Gemini AI Setup Guide

This guide will help you set up the free Google Gemini AI API for recipe generation.

## 📋 Prerequisites

- Google account (Gmail)
- Internet connection

---

## 🔑 Step 1: Get Your Free Gemini API Key

1. **Open the link**: https://aistudio.google.com/app/apikey

2. **Sign in** with your Google account

3. **Click "Create API Key"**
   - If you have existing projects, select one OR
   - Click "Create API key in new project"

4. **Copy the API key** (starts with `AIza...`)

---

## ⚙️ Step 2: Add API Key to Backend

### Option A: For Local Development

1. Open the file: `aajkyabanega-backend/.env.local`

2. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. Save the file

### Option B: For Production (Vercel)

1. Go to: https://vercel.com/sonalikalra2994-4600s-projects/aajkyabanega-backend/settings/environment-variables

2. Click "Add New"

3. Fill in:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your API key (e.g., `AIzaSyXXXXXXX...`)
   - **Environments**: Check all (Production, Preview, Development)

4. Click "Save"

5. Redeploy your backend:
   ```bash
   cd aajkyabanega-backend
   vercel --prod
   ```

---

## ✅ Step 3: Verify Setup

### Test the API locally:

```bash
curl -X POST http://localhost:3000/api/generate-recipe \
  -H "Content-Type: application/json" \
  -d '{
    "dishName": "Pav Bhaji",
    "cuisine": "Indian",
    "isVeg": true
  }'
```

### Test the API on production:

```bash
curl -X POST https://aajkyabanega-backend.vercel.app/api/generate-recipe \
  -H "Content-Type: application/json" \
  -d '{
    "dishName": "Pav Bhaji",
    "cuisine": "Indian",
    "isVeg": true
  }'
```

You should see a JSON response with ingredients and recipe steps!

---

## 🎯 Free Tier Limits

- **15 requests per minute**
- **1,500 requests per day**
- **No credit card required**
- **No expiration**

Perfect for MVP! 🚀

---

## 🐛 Troubleshooting

### Error: "Gemini API key not configured"

- Make sure you added the `GEMINI_API_KEY` to `.env.local`
- Restart your development server after adding the key

### Error: "Failed to generate recipe"

- Check if your API key is valid
- Verify you haven't exceeded the free tier limit (1500 requests/day)
- Check the network connection

### API returns markdown instead of JSON

- This is handled automatically in the code
- The API strips markdown code blocks

---

## 📚 Resources

- **Gemini AI Studio**: https://aistudio.google.com/
- **API Documentation**: https://ai.google.dev/docs
- **Pricing**: https://ai.google.dev/pricing

---

## 🎉 You're All Set!

Your backend is now powered by Google Gemini AI for free recipe generation!
