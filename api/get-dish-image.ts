import type { VercelRequest, VercelResponse } from '@vercel/node';

// Get dish image from Unsplash
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

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      console.error('UNSPLASH_ACCESS_KEY not configured');
      return res.status(500).json({ error: 'Image service not configured' });
    }

    // Search Unsplash for the dish
    // Add "food" to the query to get better food-related results
    const searchQuery = `${dishName} indian food dish`;
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      searchQuery
    )}&per_page=1&orientation=landscape&client_id=${accessKey}`;

    console.log(`🔍 Searching Unsplash for: ${searchQuery}`);

    const response = await fetch(unsplashUrl);

    if (!response.ok) {
      console.error('Unsplash API error:', response.status, response.statusText);
      return res.status(500).json({ error: 'Failed to fetch image from Unsplash' });
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.log(`⚠️ No images found for: ${dishName}`);
      // Return a fallback food image or placeholder
      return res.status(200).json({
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
        dishName,
        source: 'unsplash-fallback',
      });
    }

    const photo = data.results[0];
    const imageUrl = photo.urls.regular; // 1080px wide
    const photographer = photo.user.name;
    const photographerUrl = photo.user.links.html;

    console.log(`✅ Found image for: ${dishName} by ${photographer}`);

    return res.status(200).json({
      imageUrl,
      dishName,
      source: 'unsplash',
      photographer,
      photographerUrl,
      downloadLocation: photo.links.download_location, // For attribution tracking
    });
  } catch (error: any) {
    console.error('❌ Error fetching dish image:', error);
    return res.status(500).json({
      error: 'Failed to fetch dish image',
      message: error.message,
    });
  }
}
