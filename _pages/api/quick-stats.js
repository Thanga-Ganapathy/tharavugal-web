import { getDB } from '@/lib/db';

export default async function handler(req, res) {
  const db = await getDB();

  const eventsCol = db.collection('events');
  const tagsCol = db.collection('event-categories');
  const locCol = db.collection('event-locations');
  let output;

  switch (req.method) {
    case 'GET':
      const data = {
        events: await eventsCol.estimatedDocumentCount(),
        tags: await tagsCol.estimatedDocumentCount(),
        locations: await locCol.estimatedDocumentCount(),
      };
      output = res.status(200).json({
        data,
      });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
