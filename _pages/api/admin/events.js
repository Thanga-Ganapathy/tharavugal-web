import { getDB } from '@/lib/db';
import { TZDate } from '@date-fns/tz';
import { UTCDate } from '@date-fns/utc';

export default async function handler(req, res) {
  const db = await getDB();
  
  const collection = db.collection('events');
  let output;

  switch (req.method) {
    case 'GET':
      const query = req.query.q ? { title: { $regex: req.query.q, $options: 'i' } } : {};
      const perPage = req.query.per || 10;
      const page = parseInt(req.query.page) || 1;
      const cursor = await collection
        .find(query, { projection: { _id: 0, id: 1, title: 1, status: 1, slug: 1 } })
        .sort({ updatedAt: -1 })
        .skip(perPage * (page - 1)) // Adjust skip to start from page 1
        .limit(10);
      const colSize = await collection.estimatedDocumentCount();
      const data = {
        events: await cursor.toArray(),
        total: colSize,
      };
      output = res.status(200).json({ data });
      break;

    case 'POST':
      const result = await collection.insertOne({
        ...req.body,
        startedAt: new UTCDate(new TZDate(req.body.startedAt, req.body.startTz)),
        endedAt: new UTCDate(new TZDate(req.body.endedAt, req.body.endTz)),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (result.insertedId) {
        output = res.status(200).json({ message: 'Create Success!' });
        break;
      }
      output = res.status(422).json({ message: 'Create Failed!' });
      break;

    case 'PATCH':
      const updateData = {
        ...req.body,
      };

      if (req.body.startedAt) {
        updateData.startedAt = new TZDate(
          req.body.startedAt,
          req.body.startTz
        );
        updateData.endedAt = new UTCDate(new TZDate(req.body.endedAt, req.body.endTz));
      }

      const updateResult = await collection.updateOne(
        { id: req.body.id },
        {
          $set: {
            ...updateData,
            updatedAt: new Date(),
          },
        }
      );

      if (updateResult.modifiedCount) {
        output = res.status(200).json({ message: 'Update Success!' });
        break;
      }

      output = res.status(422).json({ message: 'Update Failed!' });
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
