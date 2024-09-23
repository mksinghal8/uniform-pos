// pages/api/products.js
import dukaanApi from '@/lib/ky';
import { NextRequest, NextResponse } from 'next/server';

const storeId = process.env.STORE_UUID;

export async function GET(req: NextRequest) {
  try {
    // Fetch products using the page parameter
    const response = await dukaanApi
      .get(`product/seller/product-category/?page=1&page_size=100&v2=true`)
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
