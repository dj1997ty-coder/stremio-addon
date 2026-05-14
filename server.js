const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

const XTREAM_API_URL = 'http://tv.business-cloud-8k.com/get.php?username=ba8aed94db&password=ntw0p7fmv5&type=m3u_plus&output=ts';

// Endpoint to serve streams
app.get('/stream/:showId', async (req, res) => {
  try {
    const response = await fetch(XTREAM_API_URL);
    const data = await response.text();

    // Parse the M3U playlist
    const lines = data.split('\n');
    const streams = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const infoLine = lines[i];
        const urlLine = lines[i + 1]; // next line is the URL

        // Extract info
        const titleMatch = infoLine.match(/,(.*)$/);
        const title = titleMatch ? titleMatch[1] : 'Stream';

        streams.push({
          name: title,
          url: urlLine
        });

        i++; // skip the URL line in the next iteration
      }
    }

    res.json(streams);
  } catch (err) {
    res.status(500).send('Error fetching playlist');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
