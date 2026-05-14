const express = require('express');
const axios = require('axios');
const app = express();

// Xtream API URL (with embedded credentials)
const xtreamApiUrl = 'http://tv.business-cloud-8k.com/get.php?username=ba8aed94db&password=ntw0p7fmv5&type=m3u_plus&output=ts';

app.use(express.json());

// Serve the manifest.json
app.get('/manifest.json', (req, res) => {
  res.json({
    "id": "com.yourname.youraddon",
    "version": "1.0.0",
    "name": "My Xtream Addon",
    "description": "An addon fetching streams from Xtream API",
    "resources": ["video"],
    "types": ["movie", "series"],
    "endpoint": "https://project-5adck-git-main-dj1997ty-5023s-projects.vercel.app"
  });
});

// Fetch streams from Xtream API
app.get('/stream', async (req, res) => {
  try {
    const response = await axios.get(xtreamApiUrl);
    const data = response.data;

    // Send the raw M3U playlist data
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(data);
  } catch (error) {
    console.error('Error fetching Xtream streams:', error.message);
    res.status(500).json({ error: 'Failed to fetch streams' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
