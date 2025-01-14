import { z } from 'zod';

export const eventCategoriesSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, '*Required'),
  info: z.string().optional(),
});

export const eventLocationsSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, '*Required'),
});

// Locations
const LocationType = z.enum([
  'Region',
  'Country',
  'State',
  'District',
  'City',
  'Neighborhood',
  'Village',
  'Area',
  'Street',
]);

export const locationsSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1, '*Required'),
    type: LocationType, // The type of the location
    parentId: z
      .object({
        id: z.string().uuid(),
        type: LocationType,
      })
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      // Perform the comparison before transforming the parentId
      if (data.parentId && data.parentId.type === data.type) {
        return false;
      }
      return true;
    },
    {
      message:
        'Parent location type must not be the same as the current location type',
      path: ['parentId'],
    }
  )
  .transform((data) => {
    // Now transform the parentId field
    return {
      ...data,
      parentId: data.parentId ? data.parentId.id : null, // Transform parentId to only contain id
    };
  });

// Entities
export const entitiesSchema = z.object({
  id: z.string().uuid(),
  type: z.string().min(1, '*Required'),
  data: z
    .string()
    .min(1, '*Required')
    .transform((val) => JSON.parse(val)),
});

export const entityTypesSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, '*Required'),
});

export const eventsSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, '*Required'),
  slug: z.string().min(1, '*Required'),
  startDate: z.date(),
  startTime: z.date(),
  startTz: z.string().min(1, '*Required'),
  endDate: z.date(),
  endTime: z.date(),
  endTz: z.string().min(1, '*Required'),
  categories: z.array(z.object({ id: z.string().uuid() })).min(1, '*Required').transform((data) => data.map(i => i.id)),
  locations: z
    .array(z.object({id: z.string().uuid()}))
    .min(1, '*Required')
    .transform((data) => data.map(i => i.id)),
  data: z
    .string()
    .min(1, '*Required')
    .transform((val) => JSON.parse(val)),
});

const IngredientsSchema = z
  .object({
    label: z.string().min(1, '*Required'),
    name: z.string().min(1, '*Required'),
  })
  .passthrough();

export const foodIngredientsSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, '*Required'),
  manufacturer: z.string().min(1, '*Required'),
  foodType: z.string().min(1, '*Required'),
  slug: z.string().min(1, '*Required'),
  categories: z.array(z.string()).nonempty(),
  originCountry: z.string().min(1, '*Required'),
  pkg: z.object({
    materials: z.array(z.string().min(1, '*Required')).nonempty(),
    bioDegradeable: z.boolean(),
  }),
  items: z.array(
    z.object({
      name: z.string().min(1, '*Required'),
      ingredients: z.array(IngredientsSchema).nonempty(),
    })
  ),
  traces: z.array(IngredientsSchema),
  image: z.string().min(1, '*Required'),
  thumb: z.string().min(1, '*Required'),
  data: z
    .string()
    .min(1, '*Required')
    .transform((val) => JSON.parse(val)),
});

const ContributorsSchema = z.object({
  name: z.string().min(1, '*Required'),
  role: z.string().min(1, '*Required'),
});

export const contributionLogsSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, '*Required'),
  image: z.string().min(1, '*Required'),
  contributionDate: z.date(),
  contributors: z.array(ContributorsSchema).nonempty(),
});

export const resourcesSchema = z.object({
  id: z.string().uuid(),
  type: z.number().min(0, '*Required').max(6, 'Invalid value'),
  file: z.object({ loc: z.string(), size: z.number() }).nullable(),
  thumb: z.object({ loc: z.string(), size: z.number() }).optional().nullable(),
  name: z.string().min(1, '*Required'),
  desc: z.string().optional(),
  publicAccess: z.boolean(),
});

export const thamizhlDictionarySchema = z.object({
  id: z.string().uuid(),
  word: z.string().min(1, '*Required'),
  definitions: z
    .array(
      z.object({
        langID: z.string().min(1, '*Required'),
        definition: z.string().min(1, '*Required'),
      })
    )
    .nonempty(),
});

export const factsSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, '*Required'),
  ui: z.object({
    code: z.object().passthrough(),
    data: z.string().min(1, '*Required'),
  }),
});

export const announcementsSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, '*Required'),
  desc: z.string().min(1, '*Required'),
  link: z
    .object({ text: z.string().optional(), url: z.string().optional() })
    .optional(),
  link2: z
    .object({ text: z.string().optional(), url: z.string().optional() })
    .optional(),
});
