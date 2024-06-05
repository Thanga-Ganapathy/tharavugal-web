import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();

  const collection = db.collection('thamizhl-dictionary');
  let output;

  switch (req.method) {
    case 'GET':
      const query = req.query.q
        ? { word: { $regex: req.query.q, $options: 'i' } }
        : {};
      const data = await collection
        .find(query, { projection: { _id: 0 } })
        .sort({ updatedAt: -1 })
        .limit(10);
      output = res.status(200).json({ data: await data.toArray() });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
