import { connect } from '@/utils/db';

export default async function handler(req, res) {
  const db = await connect();

  const collection = db.collection('events');
  let output;

  const getFormatByView = () => {
    switch (req.body.view) {
      case 'Date':
        return '%Y-%m-%d';
      case 'Week':
        return '%u';
      case 'Month':
        return '%m';
      case 'Year':
        return '%Y';
      default:
        break;
    }
  };

  switch (req.method) {
    case 'POST':
      const pipelines = [];
      const matchQuery = {
        status: 'Published',
        categories: req.body.category,
      };

      if (req.body.locations.length > 0) {
        matchQuery.locations = { $in: req.body.locations };
      }

      pipelines.push({
        $match: matchQuery,
      });

      if (req.body.from && req.body.to) {
        const dateMatchQuery = {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    '$startedAt',
                    {
                      $dateFromString: {
                        dateString: req.body.from,
                        format: '%Y-%m-%d',
                        timezone: req.body.timezone,
                      },
                    },
                  ],
                },
                {
                  $lte: [
                    '$startedAt',
                    {
                      $dateFromString: {
                        dateString: req.body.to,
                        format: '%Y-%m-%d',
                        timezone: req.body.timezone,
                      },
                    },
                  ],
                },
              ],
            },
          },
        };
        pipelines.push(dateMatchQuery);
      }

      const cursor = await collection.aggregate([
        ...pipelines,
        {
          $group: {
            _id: {
              $dateToString: {
                date: '$startedAt',
                format: getFormatByView(),
                timezone: '$startTz',
              },
            },
            total: {
              $count: {},
            },
          },
        },
        {
          $project: {
            _id: 0,
            label: '$_id',
            total: '$total',
          },
        },
        {
          $sort: {
            label: 1,
          },
        },
      ]);

      const data = await cursor.toArray();
      output = res.status(200).json({ data });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
