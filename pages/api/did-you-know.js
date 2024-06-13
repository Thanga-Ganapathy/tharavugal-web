import { getDB } from '@/lib/db';
import { sum } from '@opentf/std';
import { countBy } from '@opentf/std';

export default async function handler(req, res) {
  const db = await getDB();

  const collection = db.collection('events');
  let output;

  switch (req.method) {
    case 'GET':
      let aggArr = [
        {
          $match: {
            status: 'Published',
            categories: {
              $in: ['Lightning'],
            },
            startedAt: {
              $gte: new Date('2024-01-01'),
              $lte: new Date(),
            },
          },
        },
        {
          $project: {
            data: 1,
            _id: 0,
          },
        },
      ];
      let cursor = collection.aggregate(aggArr, {
        maxTimeMS: 60000,
        allowDiskUse: true,
      });
      let result = await cursor.toArray();
      const lightningCount = {
        killed: result.reduce((prev, cur) => {
          const c = cur.data.public.death?.count || cur.data.public.kill?.count;

          return prev + (c || 0);
        }, 0),
        injury: result.reduce((prev, cur) => {
          const c = cur.data.public.injury ? cur.data.public.injury.count : 0;

          return prev + c;
        }, 0),
      };

      aggArr = [
        {
          $match: {
            status: 'Published',
            $and: [
              {
                categories: {
                  $in: ['Death'],
                },
              },
              {
                categories: {
                  $in: ['Sudden'],
                },
              },
            ],
            locations: {
              $in: ['Republic of India'],
            },
            startedAt: {
              $gte: new Date('2024-01-01'),
              $lte: new Date(),
            },
          },
        },
        {
          $project: {
            data: 1,
            _id: 0,
          },
        },
      ];
      cursor = collection.aggregate(aggArr, {
        maxTimeMS: 60000,
        allowDiskUse: true,
      });
      result = await cursor.toArray();
      const suddenDeathsCount = result.filter((r) => {
        const p = r.data.public.death.people[0];
        return p.age < 45 || p.ageGroup === 'Middle Adult';
      });

      aggArr = [
        {
          $match: {
            status: 'Published',
            categories: {
              $in: ['Suicide'],
            },
            startedAt: {
              $gte: new Date('2024-01-01'),
              $lte: new Date(),
            },
          },
        },
        {
          $project: {
            data: 1,
            _id: 0,
          },
        },
      ];
      cursor = collection.aggregate(aggArr, {
        maxTimeMS: 60000,
        allowDiskUse: true,
      });
      result = await cursor.toArray();
      const suicideCount = sum(result, ({ data }) => data.public.death.count);
      const suicideMaleCount = result.reduce((prev, cur) => {
        const people = cur.data.public.death.people || [];
        return prev + people.filter((p) => p.sex === 'Male').length;
      }, 0);
      const suicideFemaleCount = result.reduce((prev, cur) => {
        const people = cur.data.public.death.people || [];
        return prev + people.filter((p) => p.sex === 'Female').length;
      }, 0);
      output = res.status(200).json({
        lightning: { count: lightningCount },
        suddenDeaths: { count: suddenDeathsCount.length },
        suicideCases: {
          count: suicideCount,
          male: suicideMaleCount,
          female: suicideFemaleCount,
        },
      });
      break;
    default:
      output = res.status(401);
      break;
  }

  return output;
}
