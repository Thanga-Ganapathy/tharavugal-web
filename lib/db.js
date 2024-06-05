import clientPromise from './mongodb';

export async function getDB(dbName) {
  const DB_NAME = dbName || process.env.DB_NAME;
  const client = await clientPromise;

  return client.db(DB_NAME);
}
