import getStreamingUrl from './utils/getStreamingUrl';

try {
  const streamingUrl = getStreamingUrl();
  console.log('Your streaming URL:', streamingUrl);
  
  // You can now fetch or use this URL as needed
  // Example: fetch(streamingUrl)...
} catch (error) {
  console.error(error.message);
}
