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

const API_BASE_URL = process.env.API_BASE_URL; // Set this in your environment

async function fetchStreamUrl(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data.streamUrl; // Adjust based on your API response
  } catch (error) {
    console.error('Error fetching stream:', error);
    return null;
  }
}

builder.defineStreamHandler(async (args) => {
  const { id } = args;
  const streamUrl = await fetchStreamUrl(id);
  if (streamUrl) {
    return { streams: [{ url: streamUrl, title: 'Stream from XStream' }] };
  } else {
    return { streams: [] };
  }
});

module.exports = async (req, res) => {
  const interface = builder.getInterface();
  await interface(req, res);
};
