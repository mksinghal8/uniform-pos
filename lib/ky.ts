import ky from 'ky';

const storeId = process.env.STORE_UUID;
const dukaanToken = process.env.DUKAAN_TOKEN;

if (!storeId || !dukaanToken) {
  throw new Error('Missing environment variables for STORE_UUID or DUKAAN_TOKEN');
}

const dukaanApi = ky.create({
  prefixUrl: `https://api.mydukaan.io/api/`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${dukaanToken}`,
  },
  // Add other default options if needed
});

export default dukaanApi;