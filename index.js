const { addonBuilder } = require('stremio-addon-sdk');
const axios = require('axios');

const manifest = {
  id: 'org.yourname.xstream',
  version: '1.0.0',
  name: 'XStream Streaming Addon',
  description: 'Streams content from XStream API based on selection.',
  types: ['movie', 'series'],
  resources: ['stream'],
  idPrefixes: ['tt']
};

const builder = new addonBuilder(manifest);

// Fetch stream URL from XStream API
async function fetchStreamUrl(id) {
  try {
    const response = await axios.get(`https://api.xstreamapi.com/stream/${id}`);
    return response.data.streamUrl;
  } catch (error) {
    console.error('Error fetching stream:', error);
    return null;
  }
}

// Define stream handler
builder.defineStreamHandler(async (args) => {
  const { id } = args;
  const streamUrl = await fetchStreamUrl(id);
  if (streamUrl) {
    return { streams: [{ url: streamUrl, title: 'Stream from XStream' }] };
  } else {
    return { streams: [] };
  }
});

// Export Vercel serverless function
module.exports = async (req, res) => {
  const interface = builder.getInterface();
  await interface(req, res);
};
