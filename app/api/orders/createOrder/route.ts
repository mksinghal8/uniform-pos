// pages/api/products.js
import dukaanApi from '@/lib/ky';
import { NextRequest, NextResponse } from 'next/server';

const storeId = process.env.STORE_UUID;

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    console.log("\n\n\n\n MAYANK \n",body,"\n\n\n\n MAYANK \n")

    // Ensure store ID is included
    body.store = process.env.STORE_UUID;
    if (!body.store) {
      console.log("Store is missong")
      return NextResponse.json({ error: 'Store ID is required.' }, { status: 400 });
    }

    // Make the API call to create the order
    const response = await dukaanApi.post(`order/seller/order/`, {
      json: {
        ...body,
        store: storeId, // use the storeId from your environment variable
      },
    });

    // If the response is successful, return the response data
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 201 });
    } else {
      // Handle any errors from the API response
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Failed to create order.' }, { status: response.status });
    }
  } catch (error) {
    // Handle any other errors (e.g., parsing issues)
    console.log("\n\n\nSINGHAL\n\n",error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
