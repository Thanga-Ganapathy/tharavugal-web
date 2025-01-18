import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();

  const collection = db.collection('feedbacks');
  let output;

  switch (req.method) {
    case 'GET':
      const query = req.query.q
        ? { title: { $regex: req.query.q, $options: 'i' } }
        : {};
      const data = await collection
        .find(query, { projection: { _id: 0 } })
        .sort({ createdAt: -1 });
      output = res.status(200).json({ data: await data.toArray() });
      break;

    case 'DELETE':
      const delResult = await collection.deleteOne({ id: req.query.id });

      if (delResult.deletedCount) {
        output = res.status(200).json({ message: 'Deleted!' });
        break;
      }
      output = res.status(422).json({ message: 'Delete Failed!' });
      break;

    default:
      output = res.status(401);
      break;
  }

  return output;
}
