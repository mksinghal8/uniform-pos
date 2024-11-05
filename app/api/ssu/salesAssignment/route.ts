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



export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    
    // Start of today
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    
    // Start of yesterday
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 2);

    // Fetch sales assignments from the database for today and yesterday
    const salesAssignments = await db.salesAssignment.findMany({
      where: {
        createdAt: {
          gte: startOfYesterday,
          lt: new Date(startOfToday.setHours(24, 0, 0, 0)), // exclusive of tomorrow
        },
      },
    });

    return NextResponse.json({ salesAssignments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching sales records:', error);
    return NextResponse.json({ error: 'Failed to fetch sales records' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma Client is disconnected
  }
}


export async function PUT(req: NextRequest) {
  try {
    const body = await req.json(); // Get JSON data from the request
    const { id, status } = body; // Extract id and new status from the request body

    // Update the SalesRecord entry
    const updatedSalesAssignment = await db.salesAssignment.update({
      where: { id }, // Find the record by id
      data: { status }, // Update the status
    });

    return NextResponse.json({ updatedSalesAssignment }, { status: 200 });
  } catch (error) {
    console.error('Error updating sales record:', error);
    return NextResponse.json({ error: 'Failed to update sales record' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma Client is disconnected
  }
}
