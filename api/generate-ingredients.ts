import type { VercelRequest, VercelResponse } from '@vercel/node';

// Generate ingredient list using Google Gemini
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { dishName } = req.body;

    if (!dishName || typeof dishName !== 'string') {
      return res.status(400).json({ error: 'Dish name is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'AI service not configured' });
    }

    console.log(`🥗 Generating ingredients for: ${dishName}`);

    // Call Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `List the main ingredients for ${dishName}. Return a JSON array only, no explanations.
Format: ["ingredient1", "ingredient2", "ingredient3"]
Keep it to 10-12 common grocery items.`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return res.status(500).json({ error: 'Failed to generate ingredients' });
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      console.error('No response from Gemini');
      return res.status(500).json({ error: 'No ingredients generated' });
    }

    const generatedText = data.candidates[0].content.parts[0].text.trim();
    console.log('Raw AI response:', generatedText);

    // Parse the JSON array from the response
    let ingredients: string[];
    try {
      // Remove markdown code blocks if present
      let cleanedText = generatedText.replace(/```json\s*/g, '').replace(/```\s*/g, '');

      // Try to extract JSON array from the response
      const jsonMatch = cleanedText.match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        ingredients = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: split by newlines or commas
        ingredients = cleanedText
          .split(/[\n,]/)
          .map((item: string) => item.trim().replace(/^[-•*]\s*/, '').replace(/^["']|["']$/g, ''))
          .filter((item: string) => item.length > 0 && item.length < 50);
      }

      if (!Array.isArray(ingredients) || ingredients.length === 0) {
        throw new Error('Invalid ingredient list format');
      }

      console.log(`✅ Generated ${ingredients.length} ingredients for ${dishName}`);

      return res.status(200).json({
        dishName,
        ingredients,
        count: ingredients.length,
      });
    } catch (parseError) {
      console.error('Failed to parse ingredients:', parseError);
      console.error('Generated text:', generatedText);
      return res.status(500).json({ error: 'Failed to parse ingredient list' });
    }
  } catch (error: any) {
    console.error('❌ Error generating ingredients:', error);
    return res.status(500).json({
      error: 'Failed to generate ingredients',
      message: error.message,
    });
  }
}
