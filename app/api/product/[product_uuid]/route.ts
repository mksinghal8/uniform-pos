// pages/api/products.js
import dukaanApi from '@/lib/ky';
import { NextRequest, NextResponse } from 'next/server';


const storeId = process.env.STORE_UUID;

export async function GET(
  req: NextRequest,{ params: { product_uuid } }: { params: { product_uuid: string } },) {
  try {
    // Fetch products using the page parameter
    const response = await dukaanApi
      .get(`product/seller/${storeId}/product/${product_uuid}/v2/`)
      .json<{ results: any }>();

    // Check if response is valid
    if (response) {
      console.log('Fetched products are: ', response);
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
