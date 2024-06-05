import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();
  
  const collection = db.collection('events');
  let output;

  switch (req.method) {
    case 'GET':
      const event = await collection.findOne(
        { slug: req.query.slug },
        {
          projection: {
            _id: 0,
            title: 1,
            locations: 1,
            categories: 1,
            startedAt: 1,
            startTz: 1,
            endedAt: 1,
            endTz: 1,
            updatedAt: 1,
            data: 1
          },
        }
      );
      const data = { event };
      output = res.status(200).json({ data });
      break;

    default:
      output = res.status(401);
      break;
  }

  return output;
}
