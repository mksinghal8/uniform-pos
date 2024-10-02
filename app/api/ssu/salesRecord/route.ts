import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import db from '@/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get JSON data from the request

    const { products, discount, salesman, helper, type, totalAmount } = body;

    // Calculate total items and total amount
    const totalItems = products.reduce((total, product) => total + product.quantity, 0);
    //const totalAmount = products.reduce((total, product) => total + (product.selling_price * product.quantity), 0) - discount;
    
    // Create a new SalesRecord entry
    const salesRecord = await db.salesRecord.create({
      data: {
        totalItems,
        discount,
        totalAmount,
        salesman,
        helper,
        type,
        products: [
          ...products,
        ],
      },
    });

    return NextResponse.json({ salesRecord }, { status: 201 });
  } catch (error) {
    console.error('Error creating sales record:', error);
    return NextResponse.json({ error: 'Failed to create sales record' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma Client is disconnected
  }
}
