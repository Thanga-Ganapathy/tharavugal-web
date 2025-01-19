// app/api/announcements/route.js

import { getDB } from '@/lib/db';

export async function GET(req) {
  const db = await getDB();
  const collection = db.collection('announcements');

  try {
    const data = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ updatedAt: -1 });

    return new Response(JSON.stringify({ data: await data.toArray() }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
