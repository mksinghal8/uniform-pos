// pages/api/products.js
import dukaanApi from '@/lib/ky';
import { NextRequest, NextResponse } from 'next/server';

const storeId = process.env.STORE_UUID;

export async function GET(
  req: NextRequest,{ params: { category_uuid } }: { params: { category_uuid: string } },) {
  try {
    // Fetch products using the page parameter
    const response = await dukaanApi
      .get(`seller-front/${storeId}/product-list/?category=${category_uuid}&direction=asc&ordering=position&page=1&page_size=30&pop_fields=variants_data`)
      .json<{ results: any }>();

    // Check if response is valid
    if (response) {
      console.log('Fetched products are: ', response);
      return NextResponse.json(response);
    }

    // If no products, return an empty response
    return NextResponse.json({});
  } catch (error) {
    console.error('Error fetching category Details:', error);
    return new Response(null, {
      status: 500,
    });
  }
}
