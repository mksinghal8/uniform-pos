import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import db from '@/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get JSON data from the request

    const { helper, cartDetails, salesMan, status, customer, token } = body;

   
    // Create a new SalesRecord entry
    const salesAssignment = await db.salesAssignment.create({
      data: {
        helper,
        cartDetails,
        customer,
        status,
        token,
        salesMan
      },
    });

    return NextResponse.json({ salesAssignment }, { status: 201 });
  } catch (error) {
    console.error('Error creating sales record:', error);
    return NextResponse.json({ error: 'Failed to create sales record' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma Client is disconnected
  }
}
