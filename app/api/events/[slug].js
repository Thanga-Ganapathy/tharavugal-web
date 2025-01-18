import { getDB } from '@/lib/db';
import { getParentLocations } from './route';

export default async function handler(req, res) {
  console.log('test ******************');
  console.log('req.query.slug,', req.query.slug);
  
  const db = await getDB();

  const collection = db.collection('events');
  let output;

  switch (req.method) {
    case 'GET':
      const cursor = await collection.aggregate([
        {
          $match: {
            // status: 'Published',
            slug: req.query.slug,
          },
        },
        {
          $lookup: {
            from: 'event-categories', // The collection to join with
            let: { categories: '$categories' }, // Define 'categories' variable
            pipeline: [
              {
                $match: {
                  $expr: { $in: ['$id', '$$categories'] }, // Use $$categories as a variable inside the lookup pipeline
                },
              },
            ],
            as: 'categories', // The name of the new array field containing matched location documents
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
      console.log(events);
      
      const event = events[0];
      event.locations = await getParentLocations(
        event.locations,
        locationsCollection
      );
      console.log('event', event);
      
      const data = { event };
      output = res.status(200).json({ data });
      break;

    default:
      output = res.status(401);
      break;
  }

  return output;
}
