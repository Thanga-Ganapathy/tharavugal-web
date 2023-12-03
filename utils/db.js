import { MongoClient, ServerApiVersion } from 'mongodb';

export async function connect(dbName) {
  const DB_URI = process.env.DB_URI;
  const DB_NAME = dbName || process.env.DB_NAME;
  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  try {
    await client.connect();
  } catch (error) {
    console.log('Error', error);
    client.close();
  }

  return client.db(DB_NAME);
}
