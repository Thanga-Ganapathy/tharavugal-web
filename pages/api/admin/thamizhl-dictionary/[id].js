import { connect } from '@/utils/db';

export default async function handler(req, res) {
  const db = await connect();
  const collection = db.collection('thamizhl-dictionary');
  let output;
  switch (req.method) {
    case 'GET':
      const data = await collection.findOne(
        { id: req.query.id },
        {
          projection: {
            _id: 0,
          },
        }
      );
      output = res.status(200).json({ data });
      break;

    default:
      output = res.status(401);
      break;
  }

  return output;
}
