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

https://api.mydukaan.io/api/seller-front/74f35c17-fd28-4da9-a616-96a98be777ce/product-list/?category=12073031&direction=asc&ordering=position&page=1&page_size=30&pop_fields=variants_data

https://api.mydukaan.io/api/seller-front/74f35c17-fd28-4da9-a616-96a98be777ce/product-list/?category=af1e2f01-bf39-488f-9efc-b975fa2fb2f1&direction=asc&ordering=position&page=1&page_size=30&pop_fields=variants_data