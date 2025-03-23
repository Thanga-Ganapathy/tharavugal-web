// app/api/event-categories/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

// Define the type for the body of the request (can be adjusted based on your actual schema)
interface EventCategory {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function GET(req: NextRequest) {
  const db = await getDB();
  const collection = db.collection('event-categories');
  
  // Extract query parameter q
  const url = new URL(req.url);
  const query = url.searchParams.get('q');
  const searchQuery = query ? { name: { $regex: query, $options: 'i' } } : {};

  const data = await collection
    .find(searchQuery, { projection: { _id: 0 } })
    .sort({ updatedAt: -1 })
    .limit(10);

  return NextResponse.json({ data: await data.toArray() }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const db = await getDB();
  const collection = db.collection('event-categories');
  
  const body: EventCategory = await req.json();

  const result = await collection.insertOne({
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (result.insertedId) {
    return NextResponse.json({ message: 'Create Success!' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Create Failed!' }, { status: 422 });
}

export async function PATCH(req: NextRequest) {
  const db = await getDB();
  const collection = db.collection('event-categories');
  
  const body: EventCategory = await req.json();

  const updateResult = await collection.updateOne(
    { id: body.id },
    { $set: { ...body, updatedAt: new Date() } }
  );

  if (updateResult.modifiedCount) {
    return NextResponse.json({ message: 'Update Success!' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Update Failed!' }, { status: 422 });
}

export async function DELETE(req: NextRequest) {
  const db = await getDB();
  const collection = db.collection('event-categories');
  
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required for deletion.' }, { status: 400 });
  }

  const delResult = await collection.deleteOne({ id });

  if (delResult.deletedCount) {
    return NextResponse.json({ message: 'Deleted!' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Delete Failed!' }, { status: 422 });
}
