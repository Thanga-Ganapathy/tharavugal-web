import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();
  
  const collection = db.collection('food-ingredients');
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
