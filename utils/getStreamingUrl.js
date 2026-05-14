// getStreamingUrl.js

// Function to generate the streaming URL
function getStreamingUrl() {
  const baseUrl = process.env.API_BASE_URL;        // e.g., http://tv.business-cloud-8k.com/get.php
  const username = process.env.API_USERNAME;       // your username
  const password = process.env.API_PASSWORD;       // your password

  if (!baseUrl || !username || !password) {
    throw new Error('Missing environment variables for streaming URL');
  }

  return `${baseUrl}?username=${username}&password=${password}&type=m3u_plus&output=ts`;
}

// Export the function to use elsewhere
export default getStreamingUrl;
