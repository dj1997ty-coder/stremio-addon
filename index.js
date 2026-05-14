const { createStreamApi } = require("stremio-addon-sdk");
const fetch = require("node-fetch");

// Replace with your actual credentials
const USERNAME = "ba8aed94db";
const PASSWORD = "ntw0p7fmv5";

// Store the token globally
let authToken = null;

// Function to login and get the token
async function login() {
  const loginUrl = "http://tv.business-cloud-8k.com/get.php";
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: USERNAME , password: PASSWORD }),
  });
  const data = await response.json();
  authToken = data.token; // Adjust based on actual response
}

// Fetch streams with authentication
const getStreams = async function (args) {
  if (!authToken) {
    await login();
  }

  const { id } = args;

  const apiUrl = "https://xc-api.example.com/getStreams"; // Replace with your API endpoint

  const response = await fetch(apiUrl, {
    headers: {
      "Authorization": `Bearer ${authToken}`, // Or use the way API expects token
    },
  });
  const data = await response.json();

  const streamsData = data.streams || [];

  const streams = streamsData.map((stream, index) => {
    return {
      id: `${id}-${index}`,
      name: stream.title || `Stream ${index + 1}`,
      type: "tv",
      streams: [
        {
          url: stream.streamUrl,
        },
      ],
    };
  });

  return streams;
};

const manifest = {
  id: "org.my.xcapi",
  version: "1.0.0",
  name: "XC API Streams",
  description: "Fetches streams from XC API with auth",
  resources: ["stream"],
  types: ["tv", "movie"],
  idPrefixes: ["xc"]
};

const { getRouter, createAddonInterface } = createStreamApi(manifest, { getStreams });
const addonInterface = createAddonInterface({ getRouter });

module.exports = addonInterface;