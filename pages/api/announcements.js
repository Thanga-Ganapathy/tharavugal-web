import { connect } from '@/utils/db';

export default async function handler(req, res) {
  const db = await connect();

  const collection = db.collection('announcements');
  let output;

  switch (req.method) {
    case 'GET':
      const data = await collection
        .find({}, { projection: { _id: 0 } })
        .sort({ updatedAt: -1 });
      output = res.status(200).json({ data: await data.toArray() });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
