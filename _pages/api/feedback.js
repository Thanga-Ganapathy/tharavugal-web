import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();

  const collection = db.collection('feedbacks');
  let output;

  switch (req.method) {
    case 'POST':
      const result = await collection.insertOne({
        ...req.body,
        createdAt: new Date(),
      });

      if (result.insertedId) {
        output = res.status(200).json({ message: 'Create Success!' });
        break;
      }
      output = res.status(422).json({ message: 'Create Failed!' });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
