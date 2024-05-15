import { connect } from '@/utils/db';
import { zonedTimeToUtc } from 'date-fns-tz';

export default async function handler(req, res) {
  const db = await connect();
  
  const collection = db.collection('events');
  let output;

  switch (req.method) {
    case 'GET':
      const query = req.query.q ? { title: { $regex: req.query.q, $options: 'i' } } : {};
      const perPage = req.query.per || 10;
      const page = req.query.page || 0;
      const cursor = await collection
        .find(query, { projection: { _id: 0 } })
        .sort({ updatedAt: -1 })
        .skip(perPage * page)
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
        startedAt: zonedTimeToUtc(req.body.startedAt, req.body.startTz),
        endedAt: zonedTimeToUtc(req.body.endedAt, req.body.endTz),
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
        updateData.startedAt = zonedTimeToUtc(
          req.body.startedAt,
          req.body.startTz
        );
        updateData.endedAt = zonedTimeToUtc(req.body.endedAt, req.body.endTz);
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
