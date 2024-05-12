import { connect } from '@/utils/db';

export default async function handler(req, res) {
  const db = await connect();

  const collection = db.collection('announcements');
  let output;

  switch (req.method) {
    case 'GET':
      const query = req.query.q
        ? { title: { $regex: req.query.q, $options: 'i' } }
        : {};
      const data = await collection
        .find(query, { projection: { _id: 0, id: 1, title: 1 } })
        .sort({ updatedAt: -1 });
      output = res.status(200).json({ data: await data.toArray() });
      break;

    case 'POST':
      const result = await collection.insertOne({
        ...req.body,
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
      const updateResult = await collection.updateOne(
        { id: req.body.id },
        { $set: { ...req.body, updatedAt: new Date() } }
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
