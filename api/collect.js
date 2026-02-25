export default async function handler(req, res) {
  // Allow CORS from the app itself
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { measurement_id, api_secret } = req.query;
  const params = new URLSearchParams();
  if (measurement_id) params.set('measurement_id', measurement_id);
  if (api_secret) params.set('api_secret', api_secret);

  const targetUrl = `https://server-side-tagging-4ao7jlvyta-uc.a.run.app/mp/collect?${params.toString()}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    res.status(response.status).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
