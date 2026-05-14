const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const XTREAM_API_URL = 'http://tv.business-cloud-8k.com/get.php?username=ba8aed94db&password=ntw0p7fmv5&type=m3u_plus&output=ts';

  try {
    const response = await fetch(XTREAM_API_URL);
    const data = await response.text();

    const lines = data.split('\n');
    const streams = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const infoLine = lines[i];
        const urlLine = lines[i + 1];

        const titleMatch = infoLine.match(/,(.*)$/);
        const title = titleMatch ? titleMatch[1] : 'Stream';

        streams.push({
          name: title,
          url: urlLine
        });

        i++;
      }
    }

    res.status(200).json(streams);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error fetching playlist');
  }
};
