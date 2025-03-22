import { getDB } from '@/lib/db';

export async function POST(req) {
  const db = await getDB();
  const collection = db.collection('feedbacks');
  
  try {
    const body = await req.json();
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    if (result.insertedId) {
      return new Response(JSON.stringify({ message: 'Create Success!' }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: 'Create Failed!' }), { status: 422 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error, please try again later.' }), { status: 500 });
  }
}