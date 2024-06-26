import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();
  
  const collection = db.collection("entities");
  let output;

  switch (req.method) {
    case "GET":
      const data = await collection
        .find({}, { projection: { _id: 0 } })
        .sort({ updatedAt: -1 });
      output = res.status(200).json({ data: await data.toArray() });
      break;

    case "POST":
      const result = await collection.insertOne({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (result.insertedId) {
        output = res.status(200).json({ message: "Create Success!" });
        break;
      }
      output = res.status(422).json({ message: "Create Failed!" });
      break;

    case "PATCH":
      const updateResult = await collection.updateOne(
        { id: req.body.id },
        { $set: { ...req.body, updatedAt: new Date() } }
      );

      if (updateResult.modifiedCount) {
        output = res.status(200).json({ message: "Update Success!" });
        break;
      }
      output = res.status(422).json({ message: "Update Failed!" });
      break;

    case "DELETE":
      const delResult = await collection.deleteOne({ id: req.query.id });

      if (delResult.deletedCount) {
        output = res.status(200).json({ message: "Deleted!" });
        break;
      }
      output = res.status(422).json({ message: "Delete Failed!" });
      break;

    default:
      output = res.status(401);
      break;
  }

  return output;
}
