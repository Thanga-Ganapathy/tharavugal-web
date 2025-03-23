import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  const db = await getDB();
  const collection = db.collection('locations');
  
  // Extract query parameter q
  const url = new URL(req.url);
  const query = url.searchParams.get('q');
  const searchQuery = query ? { name: { $regex: query, $options: 'i' } } : {};

  // Aggregation pipeline to get the location along with all parent locations in the correct order
  const pipeline = [
    {
      $match: searchQuery,  // Match based on the query parameter
    },
    {
      $graphLookup: {
        from: 'locations',  // The same collection (locations)
        startWith: '$parentId',  // Start from the parentId field
        connectFromField: 'parentId',  // Field to match in the connected documents
        connectToField: 'id',  // Field to match on the parent collection (i.e., locations' 'id')
        as: 'parentLocations',  // Array to hold the parent locations
        depthField: 'depth',  // Create a "depth" field to track how deep the parent-child chain is
      },
    },
    {
      $addFields: {
        parentLocations: {
          $sortArray: {
            input: "$parentLocations",
            sortBy: { depth: -1 } // Sort by depth in ascending order
          }
        }
      }
    },
    {
      $project: {
        _id: 0,  // Optionally remove the _id field from the results
        id: 1,
        name: 1,
        type: 1,
        parentId: 1,
        createdAt: 1,
        updatedAt: 1,
        parentLocations: 1,  // Include the parent locations
      },
    },
  ];

  const data = await collection.aggregate(pipeline).limit(10).toArray();

  return NextResponse.json({ data }, { status: 200 });
}
