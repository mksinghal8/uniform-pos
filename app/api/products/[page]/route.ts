// pages/api/products.js
import dukaanApi from '@/lib/ky';
import { NextRequest, NextResponse } from 'next/server';


const storeId = process.env.STORE_UUID;

export async function GET(
  req: NextRequest,
  { params: { page } }: { params: { page: string } }
) {
  try {
    // Fetch products using the page parameter
    const response = await dukaanApi
      .get(`seller-front/${storeId}/product-list/`, {
        searchParams: {
          page: page,
          ordering: '-created_at',
          page_size: '30',
          pop_fields: 'variants_data',
        },
      })
      .json<{ results: any }>();

    // Check if response is valid
    if (response) {
      return NextResponse.json(response);
    }

    // If no products, return an empty response
    return NextResponse.json({});
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(null, {
      status: 500,
    });
  }
}
