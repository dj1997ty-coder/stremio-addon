export default function getStreamingUrl() {
  const baseUrl = process.env.API_BASE_URL;
  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;

  if (!baseUrl || !username || !password) {
    throw new Error('Missing environment variables');
  }

  const url = `${baseUrl}?user=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}`;
  return url;
}
