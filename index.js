import dotenv from 'dotenv';
import getStreamingUrl from './utils/getStreamingUrl.js';

// Load environment variables from `.env` (default behavior)
dotenv.config();

try {
  const url = getStreamingUrl();
  console.log('Generated streaming URL:', url);
} catch (err) {
  console.error('Error generating URL:', err);
}
