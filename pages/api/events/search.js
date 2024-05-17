import { connect } from '@/utils/db';

export default async function handler(req, res) {
  const db = await connect();

  const eventsCol = db.collection('events');
  let output;

  switch (req.method) {
    case 'POST':
      const page = 1;
      const per = 10;
      const skip = page * per - per;
      let query = {
        status: 'Published',
      };

      if (Array.isArray(req.body.locations) && req.body.locations.length > 0) {
        query = { ...query, locations: { $in: req.body.locations } };
      }

      if (Array.isArray(req.body.tags) && req.body.tags.length > 0) {
        query = { ...query, categories: { $in: req.body.tags } };
      }

      if (req.body.from && !req.body.to) {
        query = {
          ...query,
          dateTz: {
            $gte: new Date(req.body.from),
          },
        };
      }

      if (req.body.from && req.body.to) {
        query = {
          ...query,
          dateTz: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
        };
      }

      const aggArr = [
        { $sort: { startedAt: req.body.sort === 'Descending' ? -1 : 1 } },
        {
          $addFields: {
            dateTz: {
              $dateFromParts: {
                year: { $year: { date: '$startedAt', timezone: '$startTz' } },
                month: { $month: { date: '$startedAt', timezone: '$startTz' } },
                day: {
                  $dayOfMonth: { date: '$startedAt', timezone: '$startTz' },
                },
              },
            },
          },
        },
        {
          $match: query,
        },
        {
          $project: {
            _id: 0,
            title: 1,
            slug: 1,
            locations: 1,
            startedAt: 1,
            startTz: 1,
            categories: 1,
          },
        },
        {
          $facet: {
            meta: [{ $count: 'total' }, { $addFields: { page: page } }],
            events: [{ $skip: skip }, { $limit: per }], // add projection here wish you re-shape the docs
          },
        },
      ];

      if (req.body.text) {
        aggArr.unshift({
          $match: { $text: { $search: req.body.text } },
        });
      }

      const cursor = eventsCol.aggregate(aggArr, {
        maxTimeMS: 60000,
        allowDiskUse: true,
      });
      const result = await cursor.toArray();
      output = res.status(200).json(result[0]);
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
