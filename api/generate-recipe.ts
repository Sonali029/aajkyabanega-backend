import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { dishName, cuisine = 'Indian', isVeg = true, preferences } = req.body;

        if (!dishName) {
            return res.status(400).json({ error: 'dishName is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        console.log(`🍽️ Generating recipe for: ${dishName}`);

        // Get Gemini model (using gemini-2.5-flash - latest stable free model)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Construct prompt
        const prompt = `Generate a detailed recipe for "${dishName}" (${cuisine} cuisine, ${isVeg ? 'vegetarian' : 'non-vegetarian'}) for 1 person.
${preferences ? `Additional preferences: ${preferences}` : ''}

IMPORTANT: Return ONLY valid JSON with NO markdown, NO code blocks, NO extra text. Just the raw JSON object.

CRITICAL RULES FOR INGREDIENT NAMES:
- Use EXACT ingredient names without explanations or translations in parentheses
- Do NOT add clarifications like "(chopped)", "(optional)", or English translations
- Keep ingredient names simple and authentic to the cuisine

LANGUAGE CONSISTENCY RULES:
- Use English for ALL common/basic ingredients: Water, Tomatoes, Onions, Oil, Salt, Sugar, Rice, etc.
- Use authentic regional names ONLY for specialty items that don't have common English equivalents:
  ✅ Good: "Pav", "Paneer", "Ghee", "Atta", "Besan", "Dal", "Papad", "Chaat Masala"
  ❌ Bad: "Pani" (use "Water"), "Tamatar" (use "Tomatoes"), "Pyaz" (use "Onions")
- When in doubt, use English for better clarity
- Examples:
  ✅ "Ginger Garlic Paste" NOT "Adrak Lahsun Paste"
  ✅ "Tomato Puree" NOT "Tamatar Puree"
  ✅ "Green Chillies" NOT "Hari Mirch"
  ✅ "Coriander Leaves" NOT "Hara Dhaniya"
  ✅ BUT keep: "Paneer", "Ghee", "Pav", "Dal", "Besan"

Use this EXACT format:
{
  "ingredients": [
    {
      "name": "Ingredient name",
      "quantity": number,
      "unit": "grams|kg|pieces|cups|tbsp|tsp|ml|liters",
      "category": "vegetables|fruits|dairy|spices|meat-eggs|staples|essentials|other"
    }
  ],
  "recipe": [
    {
      "stepNumber": number,
      "title": "Brief step title",
      "instruction": "Detailed cooking instruction",
      "duration": number (in minutes)
    }
  ]
}

Example for reference (notice: "Tomatoes", "Water", "Oil" in English, but "Pav" stays regional):
{
  "ingredients": [
    {"name": "Tomatoes", "quantity": 100, "unit": "grams", "category": "vegetables"},
    {"name": "Water", "quantity": 50, "unit": "ml", "category": "essentials"},
    {"name": "Oil", "quantity": 15, "unit": "ml", "category": "essentials"},
    {"name": "Pav", "quantity": 2, "unit": "pieces", "category": "staples"},
    {"name": "Ginger Garlic Paste", "quantity": 1, "unit": "tsp", "category": "spices"},
    {"name": "Salt", "quantity": 0.5, "unit": "tsp", "category": "spices"}
  ],
  "recipe": [
    {"stepNumber": 1, "title": "Prepare vegetables", "instruction": "Wash and chop tomatoes finely. Set aside in a bowl.", "duration": 5},
    {"stepNumber": 2, "title": "Cook base", "instruction": "Heat oil in a pan over medium heat. Add ginger garlic paste and sauté for 30 seconds. Add the chopped tomatoes and stir for 2-3 minutes.", "duration": 10}
  ]
}`;

        // Generate content
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        console.log('🤖 AI Response:', responseText.substring(0, 200) + '...');

        // Extract JSON from response (remove markdown code blocks if present)
        let jsonText = responseText.trim();

        // Remove markdown code blocks
        jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');

        // Extract JSON object
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            console.error('❌ Failed to extract JSON from response:', responseText);
            throw new Error('Invalid AI response format');
        }

        const recipeData = JSON.parse(jsonMatch[0]);

        // Validate response structure
        if (!recipeData.ingredients || !Array.isArray(recipeData.ingredients)) {
            throw new Error('Invalid ingredients format');
        }
        if (!recipeData.recipe || !Array.isArray(recipeData.recipe)) {
            throw new Error('Invalid recipe format');
        }

        console.log(`✅ Recipe generated successfully for ${dishName}`);

        // Return formatted response
        return res.status(200).json({
            dishName,
            servings: 1,
            ingredients: recipeData.ingredients,
            recipe: recipeData.recipe,
            aiGenerated: true,
            generatedAt: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error('❌ Recipe generation error:', error);

        return res.status(500).json({
            error: 'Failed to generate recipe',
            message: error.message || 'Unknown error occurred',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
}
