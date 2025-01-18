import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();

  const eventsCol = db.collection('events');
  const foodIngCol = db.collection('food-ingredients');
  const resCol = db.collection('resources');
  let output;

  switch (req.method) {
    case 'GET':
      const query = {
        status: 'Published',
        // $text: { $search: req.query.q },
        title: { $regex: req.query.q, $options: 'i' },
      };

      let cursor = await eventsCol
        .find(query, {
          projection: {
            _id: 0,
            title: 1,
            slug: 1,
            startedAt: 1,
          },
        })
        .sort({ startedAt: -1 })
        .limit(10);
      const events = await cursor.toArray();

      cursor = await foodIngCol
        .find(
          { name: { $regex: req.query.q, $options: 'i' } },
          {
            projection: {
              _id: 0,
              name: 1,
              slug: 1,
              foodType: 1,
            },
          }
        )
        .limit(10);
      const foodIngredients = await cursor.toArray();

      // cursor = await resCol
      //   .find(
      //     { name: { $regex: req.query.q, $options: 'i' } },
      //     {
      //       projection: {
      //         _id: 0,
      //         name: 1,
      //         thumb: 1,
      //         type: 1,
      //         publicAccess: 1,
      //         file: 1,
      //         desc: 1,
      //       },
      //     }
      //   )
      //   .limit(10);
      // const resources = await cursor.toArray();

      output = res.status(200).json({ data: { events, foodIngredients } });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
