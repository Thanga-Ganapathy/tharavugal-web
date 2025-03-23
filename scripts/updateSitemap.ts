import { Db } from 'mongodb';
// ...existing code...

async function run(): Promise<void> {
  console.log('Updating sitemap...');
  const DB_NAME = 'tharavugal';
  const db: Db = await getDB(DB_NAME);
  // ...existing code...
}
