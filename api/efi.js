export default async function handler(req, res) {
  const { method, body } = req;

  try {
    const response = await fetch('https://pix.efipay.com.br' + req.url.replace('/api', ''), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
      },
      body: method !== 'GET' && method !== 'HEAD' ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
}
