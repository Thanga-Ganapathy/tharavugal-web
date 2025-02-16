// app/api/events/route.js

import { getDB } from '@/lib/db';

export async function GET(req) {
  const db = await getDB();

  const eventsCol = db.collection('events');
  const tagsCol = db.collection('event-categories');
  const locCol = db.collection('locations');

  const data = {
    events: await eventsCol.estimatedDocumentCount(),
    tags: await tagsCol.estimatedDocumentCount(),
    locations: await locCol.estimatedDocumentCount(),
  };

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
