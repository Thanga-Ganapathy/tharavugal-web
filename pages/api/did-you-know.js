import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();

  const collection = db.collection('events');
  let output;

  switch (req.method) {
    case 'GET':
      // const data = await collection
      //   .find({}, { projection: { _id: 0 } })
      //   .sort({ updatedAt: -1 });
      const aggArr = [
        {
          $match: {
            status: 'Published',
            categories: {
              $in: ['Lightning'],
            },
            startedAt: {
              $gte: new Date('2024-01-01'),
              $lte: new Date(),
            },
          },
        },
        {
          $project: {
            data: 1,
            _id: 0,
          },
        },
      ];
      const cursor = collection.aggregate(aggArr, {
        maxTimeMS: 60000,
        allowDiskUse: true,
      });
      const result = await cursor.toArray();
      const count = {
        killed: result.reduce((prev, cur) => {
          const c = cur.data.public.death
            ? cur.data.public.death.count
            : cur.data.public.kill.count;

          return prev + (c || 0);
        }, 0),
        injury: result.reduce((prev, cur) => {
          const c = cur.data.public.injury ? cur.data.public.injury.count : 0;

          return prev + c;
        }, 0),
      };

      output = res.status(200).json({ count });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
