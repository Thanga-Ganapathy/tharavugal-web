import { getDB } from '@/lib/db';
import { getParentLocations } from '../route';

// The API route handler for 'GET' requests
export async function GET(req, { params }) {
  const { slug } = await params;
  const db = await getDB();
  const collection = db.collection('events');
  let output;

  try {
    // Aggregate query to fetch event data based on the slug
    const cursor = await collection.aggregate([
      {
        $match: {
          slug: slug, // Use params.slug instead of req.query.slug
        },
      },
      {
        $lookup: {
          from: 'event-categories',
          let: { categories: '$categories' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$id', '$$categories'] },
              },
            },
          ],
          as: 'categories',
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          locations: 1,
          categories: 1,
          startedAt: 1,
          startTz: 1,
          endedAt: 1,
          endTz: 1,
          updatedAt: 1,
          data: 1,
        },
      },
    ]);

    const locationsCollection = db.collection('locations');
    let events = JSON.parse(JSON.stringify(await cursor.toArray()));

    const event = events[0];
    event.locations = await getParentLocations(
      event.locations,
      locationsCollection
    );

    output = new Response(JSON.stringify({ data: event }), { status: 200 });
  } catch (error) {
    console.error(error);
    output = new Response('Internal Server Error', { status: 500 });
  }

  return output;
}
