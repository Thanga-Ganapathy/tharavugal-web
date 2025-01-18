import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();
  const collection = db.collection('locations');
  let output;
  switch (req.method) {
    case 'GET':
      const data = await collection
        .aggregate([
          {
            $match: { id: req.query.id },
          },
          {
            $lookup: {
              from: 'locations', // Replace with your collection name
              localField: 'parentId',
              foreignField: 'id', // Assuming 'id' is the field in the parent document
              as: 'parent', // The name of the array field to store the joined documents
            },
          },
          {
            $project: {
              _id: 0,
              id: 1,
              name: 1,
              type: 1,
              parent: {
                $cond: {
                  if: { $gt: [{ $size: '$parent' }, 0] }, // If the 'parent' array has any elements
                  then: {
                    id: { $arrayElemAt: ['$parent.id', 0] }, // Get the 'id' of the first element
                    name: { $arrayElemAt: ['$parent.name', 0] }, // Get the 'name' of the first element
                    type: { $arrayElemAt: ['$parent.type', 0] }, // Get the 'name' of the first element
                  },
                  else: null, // If no parent is found, set 'parent' to null
                },
              },
            },
          },
          {
            $unwind: {
              path: '$parent',
              preserveNullAndEmptyArrays: true, // Optional: keep the document even if there is no matching parent
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
