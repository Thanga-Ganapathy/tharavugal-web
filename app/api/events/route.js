import { getDB } from '@/lib/db';
import { reverse } from '@opentf/std';

export async function getParentLocations(locationIds, locationsCollection) {
  // Recursive function to fetch parent locations for each locationId
  const fetchParentLocations = async (parentId) => {
    if (!parentId) {
      return []; // If no parent, return an empty array
    }

    // Find the parent location by parentId
    const parentLocation = await locationsCollection.findOne(
      { id: parentId },
      { projection: { _id: 0 } }
    );

    if (!parentLocation) {
      return []; // If no parent location found, return an empty array
    }

    // Recursively find the parent of the parent
    const parents = await fetchParentLocations(parentLocation.parentId);

    // Return the parent locations in hierarchical order (top to bottom)
    return [...parents, parentLocation]; // Add the current parent at the end of the array
  };

  // For each locationId in the locations array, fetch parent locations
  const result = [];
  for (const locationId of locationIds) {
    const location = await locationsCollection.findOne({ id: locationId });

    if (location?.parentId) {
      // Fetch the parent locations for this specific location
      const parentLocations = await fetchParentLocations(location.parentId);

      // Store the parent locations in result
      result.push({
        id: location.id,
        name: location.name,
        parentLocations: reverse(parentLocations),
      });
    }
  }

  return result;
}

export async function GET(req) {
  const db = await getDB();

  const { searchParams } = req.nextUrl;
  const page = searchParams.get('page') || 1;
  const per = 10;
  const skip = page * per - per;

  const eventsCol = db.collection('events');
  const cursor = eventsCol.aggregate([
    {
      $match: {
        status: 'Published',
      },
    },
    {
      $lookup: {
        from: 'event-categories', // The collection to join with
        let: { categories: '$categories' }, // Define 'categories' variable
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$id', '$$categories'] }, // Use $$categories as a variable inside the lookup pipeline
            },
          },
        ],
        as: 'categories', // The name of the new array field containing matched location documents
      },
    },
    {
      $sort: {
        startedAt: -1,
      },
    },
    { $skip: skip },
    {
      $limit: per,
    },
    {
      $project: {
        _id: 0,
        id: 1,
        title: 1,
        slug: 1,
        locations: 1,
        startedAt: 1,
        startTz: 1,
        categories: { id: 1, name: 1 },
      },
    },
  ]);

  const locationsCollection = db.collection('locations');
  let data = JSON.parse(JSON.stringify(await cursor.toArray()));

  for (const e of data) {
    // Await the result of getParentLocations for each location in the `locations` array
    e.locations = await getParentLocations(
      e.locations,
      locationsCollection
    );
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
