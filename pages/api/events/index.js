import { connect } from '@/utils/db';

export default async function handler(req, res) {
  const db = await connect();

  let output;

  switch (req.method) {
    case 'GET':
      const eventsCol = db.collection('events');
      const cursor = eventsCol.aggregate([
        {
          $match: {
            status: 'Published',
          },
        },
        {
          $sort: {
            startedAt: -1,
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            title: 1,
            slug: 1,
            locations: 1,
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
