import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();
  const collection = db.collection('events');
  let output;
  switch (req.method) {
    case 'GET':
      const data = await collection
        .aggregate([
          {
            $match: { id: req.query.id },
          },
          {
            $addFields: {
              oldLocations: '$locations', // Copy the 'locations' array to 'oldLocations'
              oldCategories: '$categories', // Copy the 'locations' array to 'oldLocations'
            },
          },
          {
            $lookup: {
              from: 'locations', // The collection to join with
              let: { locations: '$locations' }, // Define 'locations' variable
              pipeline: [
                {
                  $match: {
                    $expr: { $in: ['$id', '$$locations'] }, // Use $$locations as a variable inside the lookup pipeline
                  },
                },
              ],
              as: 'locations', // The name of the new array field containing matched location documents
            },
          },
          {
            $lookup: {
              from: 'event-categories', // The collection to join with
              let: { categories: '$categories' }, // Define 'categories' variable
              pipeline: [
                {
                  $match: {
                    $expr: { $in: ['$id', '$$categories'] }, // Use $$categories as a variable inside the lookup pipeline
                  },
                },
              ],
              as: 'categories', // The name of the new array field containing matched location documents
            },
          },
          {
            $project: {
              _id: 0,
              id: 1,
              title: 1,
              slug: 1,
              startTz: 1,
              endTz: 1,
              data: 1,
              startedAt: 1,
              endedAt: 1,
              locations: {
                id: 1,
                name: 1,
                type: 1,
                parentId: 1,
              },
              categories: { id: 1, name: 1 },
              oldLocations: 1,
              oldCategories: 1
            },
          },
        ])
        .toArray();

      // If you expect only one document
      const result = data.length > 0 ? data[0] : null;

      output = res.status(200).json({ data: result });
      break;

    default:
      output = res.status(401);
      break;
  }

  return output;
}
