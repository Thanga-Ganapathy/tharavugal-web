import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { TZDate } from '@date-fns/tz';
import { UTCDate } from '@date-fns/utc';

interface Event {
  id: string;
  title: string;
  status: string;
  slug: string;
  startedAt: string;
  endedAt: string;
  startTz: string;
  endTz: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// GET Method handler
export async function GET(req: NextRequest): Promise<NextResponse> {
  const db = await getDB();
  const collection = db.collection('events');

  const query = req.nextUrl.searchParams.get('q')
    ? { title: { $regex: req.nextUrl.searchParams.get('q'), $options: 'i' } }
    : {};

  const perPage = Number(req.nextUrl.searchParams.get('per')) || 10;
  const page = Number(req.nextUrl.searchParams.get('page')) || 1;

  const cursor = await collection
    .find(query, { projection: { _id: 0, id: 1, title: 1, status: 1, slug: 1 } })
    .sort({ updatedAt: -1 })
    .skip(perPage * (page - 1))
    .limit(10);

  const colSize = await collection.estimatedDocumentCount();

  const data = {
    events: await cursor.toArray(),
    total: colSize,
  };

  return NextResponse.json({ data });
}

// POST Method handler
export async function POST(req: NextRequest): Promise<NextResponse> {
  const db = await getDB();
  const collection = db.collection('events');

  const body: Event = await req.json();

  const result = await collection.insertOne({
    ...body,
    startedAt: new UTCDate(new TZDate(body.startedAt, body.startTz)),
    endedAt: new UTCDate(new TZDate(body.endedAt, body.endTz)),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (result.insertedId) {
    return NextResponse.json({ message: 'Create Success!' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Create Failed!' }, { status: 422 });
}

// PATCH Method handler
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const db = await getDB();
  const collection = db.collection('events');

  const body: Event = await req.json();
  const updateData: Partial<Event> = { ...body };

  if (body.startedAt) {
    updateData.startedAt = new TZDate(body.startedAt, body.startTz);
    updateData.endedAt = new UTCDate(new TZDate(body.endedAt, body.endTz));
  }

  const updateResult = await collection.updateOne(
    { id: body.id },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    }
  );

  if (updateResult.modifiedCount) {
    return NextResponse.json({ message: 'Update Success!' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Update Failed!' }, { status: 422 });
}

// DELETE Method handler
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const db = await getDB();
  const collection = db.collection('events');

  const { id } = req.nextUrl.searchParams;

  const delResult = await collection.deleteOne({ id });

  if (delResult.deletedCount) {
    return NextResponse.json({ message: 'Deleted!' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Delete Failed!' }, { status: 422 });
}
