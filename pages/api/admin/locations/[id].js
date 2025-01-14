import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();
  const collection = db.collection('locations');
  let output;
  switch (req.method) {
    case 'GET':
      const data = await collection.aggregate([
        {
          $match: { id: req.query.id }
        },
        {
          $lookup: {
            from: 'locations', // Replace with your collection name
            localField: 'parentId',
            foreignField: 'id', // Assuming 'id' is the field in the parent document
            as: 'parent' // The name of the array field to store the joined documents
          }
        },
        {
          $unwind: {
            path: '$parent',
            preserveNullAndEmptyArrays: true // Optional: keep the document even if there is no matching parent
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            type: 1,
            parent: {
              id: '$parent.id',
              name: '$parent.name',
              // Include any other fields from the parent document you want
            }
          }
        }
      ]).toArray();
      
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
