import ky from 'ky';

const storeId = process.env.STORE_UUID;
const dukaanToken = process.env.DUKAAN_TOKEN;

if (!storeId || !dukaanToken) {
  throw new Error('Missing environment variables for STORE_UUID or DUKAAN_TOKEN');
}

const dukaanApi = ky.create({
  prefixUrl: `https://api.mydukaan.io/api/seller-front/${storeId}/product-list/`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${dukaanToken}`,
  },
  searchParams: {
    ordering: '-created_at',
    page: '1',
    page_size: '30',
    pop_fields: 'variants_data',
  },
  // Add other default options if needed
});

export default dukaanApi;

// https://api.mydukaan.io/api/seller-front/{{store_uuid}}/product-list/?ordering=-created_at&page=1&page_size=30&pop_fields=variants_data
