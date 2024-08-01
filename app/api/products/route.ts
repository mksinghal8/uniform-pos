// pages/api/products.js
import dukaanApi from '@/lib/ky';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await dukaanApi.get('').json<{ results: any }>();
    if (products) {
      console.log("Fetched products are: ", products);
    }
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
    });
  }
}
