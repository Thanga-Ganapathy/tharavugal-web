import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();

  let output;

  switch (req.method) {
    case 'GET':
      const page = req.query.page;
      const per = 10;
      const skip = page * per - per;
      const eventsCol = db.collection('events');
      const cursor = eventsCol.aggregate([
        {
          $match: {
            status: 'Published',
          },
        },
        {
          $lookup: {
            from: 'locations', // The collection to join with
            let: { locations: '$locations' }, // Define 'locations' variable
            pipeline: [
              {
                $match: {
                  $expr: { $in: ['$id', '$$locations'] }, // Use $$locations as a variable inside the lookup pipeline
                },
              },
            ],
            as: 'locations', // The name of the new array field containing matched location documents
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
          $sort: {
            startedAt: -1,
          },
        },
        { $skip: skip },
        {
          $limit: per,
        },
        {
          $project: {
            title: 1,
            slug: 1,
            locations: { id: 1, name: 1 },
            startedAt: 1,
            startTz: 1,
            categories: 1,
          },
        },
      ]);
      const data = JSON.parse(JSON.stringify(await cursor.toArray()));
      output = res.status(200).json({
        data,
      });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
