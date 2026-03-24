import type { VercelRequest, VercelResponse } from '@vercel/node';

// Helper to generate search variations for better results
function generateSearchVariations(dishName: string): string[] {
  const variations: string[] = [];

  // Try exact name first
  variations.push(dishName);

  // Try with "indian" prefix
  variations.push(`${dishName} indian`);

  // Try with "food" suffix
  variations.push(`${dishName} food`);

  // Try with both
  variations.push(`${dishName} indian food`);

  // For dishes with multiple words, try without connectors
  const simplified = dishName.toLowerCase().replace(/\s+/g, ' ').trim();
  if (simplified !== dishName.toLowerCase()) {
    variations.push(simplified);
  }

  return variations;
}

// Search Unsplash
async function searchUnsplash(query: string, accessKey: string) {
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=3&orientation=landscape&client_id=${accessKey}`;

  const response = await fetch(unsplashUrl);
  if (!response.ok) return null;

  const data = await response.json();
  if (!data.results || data.results.length === 0) return null;

  const photo = data.results[0];
  return {
    imageUrl: photo.urls.regular,
    source: 'unsplash',
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
  };
}

// Search Pexels
async function searchPexels(query: string, apiKey: string) {
  const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=3&orientation=landscape`;

  const response = await fetch(pexelsUrl, {
    headers: { Authorization: apiKey },
  });

  if (!response.ok) return null;

  const data = await response.json();
  if (!data.photos || data.photos.length === 0) return null;

  const photo = data.photos[0];
  return {
    imageUrl: photo.src.large,
    source: 'pexels',
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
  };
}

// Get dish image from Unsplash with Pexels fallback
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

    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
    const pexelsKey = process.env.PEXELS_API_KEY;

    if (!unsplashKey && !pexelsKey) {
      console.error('No image service API keys configured');
      return res.status(500).json({ error: 'Image service not configured' });
    }

    console.log(`🔍 Searching for images of: ${dishName}`);

    // Generate search variations
    const variations = generateSearchVariations(dishName);

    // Try Unsplash with multiple variations
    if (unsplashKey) {
      for (const query of variations) {
        console.log(`  🔍 Unsplash: "${query}"`);
        const result = await searchUnsplash(query, unsplashKey);
        if (result) {
          console.log(`✅ Found on Unsplash: ${query}`);
          return res.status(200).json({ ...result, dishName, query });
        }
      }
      console.log('⚠️ No results on Unsplash');
    }

    // Fallback to Pexels
    if (pexelsKey) {
      for (const query of variations) {
        console.log(`  🔍 Pexels: "${query}"`);
        const result = await searchPexels(query, pexelsKey);
        if (result) {
          console.log(`✅ Found on Pexels: ${query}`);
          return res.status(200).json({ ...result, dishName, query });
        }
      }
      console.log('⚠️ No results on Pexels');
    }

    // Ultimate fallback - generic Indian food image
    console.log('⚠️ Using fallback image');
    return res.status(200).json({
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
      dishName,
      source: 'fallback',
    });
  } catch (error: any) {
    console.error('❌ Error fetching dish image:', error);
    return res.status(500).json({
      error: 'Failed to fetch dish image',
      message: error.message,
    });
  }
}
