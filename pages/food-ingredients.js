import Layout from '@/components/layouts/DefaultLayout';
import { getDB } from '@/lib/db';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProgressiveImg from '@/components/ProgressiveImg';
import Link from '@/components/app/Link';

const CATEGORY_COLORS = {
  Vegetables: '#2ECC40',
  'Grains, legumes, nuts and seeds': 'rgb(102, 60, 0)',
  Fruits: '#FF851B',
  'Meat and poultry': '#FF4136',
  'Fish and seafood': '#0074D9',
  'Dairy foods': '',
  Eggs: '#85144b',
};

function FICard({ food, R2_DOMAIN }) {
  return (
    <Card sx={{ minWidth: 200, m: 1 }} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
          <Box
            sx={{
              width: '100px',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ProgressiveImg
              src={`${R2_DOMAIN}/${food.thumb ? food.thumb : food.image}`}
              alt="Product Thumbnail"
            />
          </Box>
          <Box sx={{ px: 2 }}>
            <Link href={`/food-ingredients/${food.slug}`} rel="canonical">
              <Typography variant="h6">{food.name}</Typography>
            </Link>
            <Typography sx={{ mt: 2 }} color="text.secondary">
              {food.foodType}
            </Typography>
            <Box sx={{}}>
              {food.categories?.map((c, i) => (
                <Box key={i}>
                  <Chip
                    label={c}
                    size="small"
                    sx={{
                      color: CATEGORY_COLORS[c],
                      borderColor: CATEGORY_COLORS[c],
                      fontWeight: 'bold',
                      mt: 1,
                      height: 'auto',
                      '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                      },
                    }}
                    variant="outlined"
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function FoodIngredients({ data }) {
  return (
    <Layout title="Food Ingredients">
      <Box textAlign="center">
        <Typography variant="h5">Food Ingredients</Typography>
      </Box>
      <Paper sx={{ mt: { xs: 1, sm: 1, md: 2 }, p: { xs: 2, sm: 2, md: 3 } }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <ChevronRightIcon /> Featured
        </Typography>
        <Divider />
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap' }}>
          {data.foods.map((f, i) => (
            <FICard key={i} food={f} R2_DOMAIN={data.R2_DOMAIN} />
          ))}
        </Box>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const db = await getDB();
  const col = db.collection('food-ingredients');
  const cursor = col.find(
    {},
    {
      projection: {
        _id: 0,
        name: 1,
        foodType: 1,
        categories: 1,
        slug: 1,
        image: 1,
        thumb: 1,
      },
    }
  );

  const foods = JSON.parse(JSON.stringify(await cursor.toArray()));
  return {
    props: {
      data: {
        foods,
        R2_DOMAIN: process.env.R2_DOMAIN,
      },
    },
  };
}
