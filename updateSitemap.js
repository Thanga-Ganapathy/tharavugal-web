import fs from 'fs';
import { toXML } from 'jstoxml';
import { format } from 'date-fns';
import { connect } from './utils/db';

const baseUrl = {
  loc: 'https://tharavugal.org/',
  lastmod: '2023-12-22',
};

const staticUrls = [
  {
    url: {
      loc: 'https://tharavugal.org/food-ingredients',
      lastmod: '2023-10-11',
    },
  },
  {
    url: {
      loc: 'https://tharavugal.org/videos',
      lastmod: '2023-10-11',
    },
  },
  {
    url: {
      loc: 'https://tharavugal.org/faqs',
      lastmod: '2023-10-11',
    },
  },
];

const urlset = {
  xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  'xsi:schemaLocation':
    'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
};

async function run() {
  console.log('Updating sitemap...');
  const DB_NAME = 'tharavugal';
  const db = await connect(DB_NAME);

  // Events
  const collection = db.collection('events');
  const cursor = await collection.find(
    {},
    { projection: { _id: 0, slug: 1, updatedAt: 1 } }
  );
  const events = await cursor.toArray();
  const xmlEvents = events.map((e) => ({
    url: {
      loc: 'https://tharavugal.org/events/' + e.slug,
      lastmod: format(e.updatedAt, 'yyyy-MM-dd'),
    },
  }));

  // Food Ingredients
  const foodIngCol = db.collection('food-ingredients');
  const foodIngCursor = await foodIngCol.find(
    {},
    { projection: { _id: 0, slug: 1, updatedAt: 1 } }
  );
  const foodIngredients = await foodIngCursor.toArray();
  const xmlFoodIngredients = foodIngredients.map((e) => ({
    url: {
      loc: 'https://tharavugal.org/food-ingredients/' + e.slug,
      lastmod: format(e.updatedAt, 'yyyy-MM-dd'),
    },
  }));

  // XML
  const xml = toXML(
    {
      _name: 'urlset',
      _attrs: urlset,
      _content: [
        { url: baseUrl },
        ...staticUrls,
        ...xmlFoodIngredients,
        ...xmlEvents,
      ],
    },
    { header: true, indent: ' ' }
  );
  console.log('Writing xml into sitemap.xml');
  fs.writeFileSync('public/sitemap.xml', xml);
  process.exit();
}

run();
