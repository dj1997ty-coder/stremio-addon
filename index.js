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

// Replace this with your actual API endpoint
async function fetchStreamUrl(id) {
  try {
    // Example API call; replace with your real API
    const response = await axios.get(`https://api.xstreamapi.com/stream/${id}`);
    return response.data.streamUrl; // Adjust based on your API response
  } catch (error) {
    console.error('Error fetching stream:', error);
    return null;
  }
}

// Define the stream handler
builder.defineStreamHandler(async (args) => {
  console.log('Stream handler invoked with args:', args);
  const { id } = args;
  const streamUrl = await fetchStreamUrl(id);
  console.log('Fetched stream URL:', streamUrl);
  if (streamUrl) {
    return { streams: [{ url: streamUrl, title: 'Stream from XStream' }] };
  } else {
    return { streams: [] };
  }
});

// Export the Vercel serverless function
module.exports = async (req, res) => {
  const interface = builder.getInterface();
  await interface(req, res);
};
