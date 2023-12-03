import { connect } from '@/utils/db';

export default async function handler(req, res) {
  let output;

  switch (req.method) {
    case 'GET':
      const db = await connect();
      const eventsCol = db.collection('events');
      const aggrData = eventsCol.aggregate([
        {
          $unwind: {
            path: '$categories',
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $match: {
            categories: {
              $regex: new RegExp(`^${req.query.alp}`, 'i'),
            },
          },
        },
        {
          $group: {
            _id: '$categories',
            count: {
              $count: {},
            },
          },
        },
        {
          $addFields: {
            tag: '$_id',
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
        {
          $sort: {
            tag: 1,
          },
        },
      ]);
      const data = await aggrData.toArray();
      output = res.status(200).json({ data });
      break;

    default:
      output = res.status(401);
      break;
  }

  return output;
}
