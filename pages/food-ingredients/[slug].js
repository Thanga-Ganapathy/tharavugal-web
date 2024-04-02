import Layout from '@/components/layouts/DefaultLayout';
import { connect } from '@/utils/db';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Typography,
  Link as MUILink,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecyclingIcon from '@mui/icons-material/Recycling';
import Ingredient from '@/components/foodIngredients/Ingredient';
import ProgressiveImg from '@/components/ProgressiveImg';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';

const CATEGORY_COLORS = {
  Vegetables: '#2ECC40',
  'Grains, legumes, nuts and seeds': 'rgb(102, 60, 0)',
  Fruits: '#FF851B',
  'Meat and poultry': '#FF4136',
  'Fish and seafood': '#0074D9',
  'Dairy foods': '',
  Eggs: '#85144b',
};

export default function Page({ data }) {
  const renderIngredients = () => {
    return data.record.items.map((item, i) => (
      <Card key={i} variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'info.main' }}>
            {item.name} ({item.ingredients.length})
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}
          >
            {item.ingredients.map((ing, i) => (
              <Ingredient key={i} data={ing} />
            ))}
          </Box>
        </CardContent>
      </Card>
    ));
  };

  const renderTraces = () => {
    return (
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'info.main' }}>
            Traces ({data.record.traces.length})
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            The following ingredients may or may not be contained in the food
          </Alert>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}
          >
            {data.record.traces.map((ing, i) => (
              <Ingredient key={i} data={ing} />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };

  const breadcrumbs = [
    <MUILink
      component={Link}
      underline="hover"
      key="1"
      color="inherit"
      href="/food-ingredients"
    >
      Food Ingredients
    </MUILink>,
    <Typography key="3" color="text.primary">
      {data.record.name}
    </Typography>,
  ];

  return (
    <Layout title={data.record.name + ' | Food Ingredients'}>
      <Paper sx={{ mt: 2, p: { xs: 2, sm: 2, md: 3 } }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Box
          sx={{
            display: { md: 'grid' },
            gridTemplateColumns: '40% 60%',
            columnGap: 2,
          }}
        >
          <Box sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
            <ProgressiveImg
              src={`${data.R2_DOMAIN}/${data.record.image}`}
              alt="Image"
            />
            <Alert severity="warning">
              The image displayed here is only for illustration purposes.
            </Alert>
          </Box>
          <Box sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
            <Typography variant="h4">{data.record.name}</Typography>

            <Box component="table" sx={{ mt: 2 }}>
              <tbody>
                <tr>
                  <th align="left">Type</th>
                  <Box component="td" sx={{ pl: 2, color: 'text.secondary' }}>
                    {data.record.foodType}
                  </Box>
                </tr>
                <tr>
                  <th align="left">Manufacturer</th>
                  <Box component="td" sx={{ pl: 2, color: 'text.secondary' }}>
                    {data.record.manufacturer}
                  </Box>
                </tr>
                <tr>
                  <th align="left">Origin of Country</th>
                  <Box component="td" sx={{ pl: 2, color: 'text.secondary' }}>
                    {data.record.originCountry}
                  </Box>
                </tr>
                <tr>
                  <th align="left">Updated At</th>
                  <Box component="td" sx={{ pl: 2, color: 'text.secondary' }}>
                    {data.record.updatedAt}
                  </Box>
                </tr>
                <tr>
                  <th align="left">Categories</th>
                  <Box component="td" sx={{ pl: 2, color: 'text.secondary' }}>
                    {data.record.categories?.map((c, i) => (
                      <Chip
                        key={i}
                        label={c}
                        size="small"
                        sx={{
                          color: CATEGORY_COLORS[c],
                          borderColor: CATEGORY_COLORS[c],
                          fontWeight: 'bold',
                          m: 1,
                          height: 'auto',
                          '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                          },
                        }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </tr>
              </tbody>
            </Box>

            <Box mt={2}>
              <Card variant="outlined" sx={{ width: 'max-content' }}>
                <CardContent>
                  <Typography variant="h6">Packaging</Typography>
                  <Typography variant="body2" mt={2}>
                    Materials Used:
                  </Typography>
                  <ul>
                    {data.record.pkg.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                  <Chip
                    icon={<RecyclingIcon />}
                    variant="outlined"
                    color={data.record.pkg.bioDegradeable ? 'success' : 'error'}
                    sx={{
                      mt: 2,
                    }}
                    label={
                      data.record.pkg.bioDegradeable
                        ? 'Biodegradable'
                        : 'Non Biodegradable'
                    }
                  />
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>

        <Box mt={2}>
          <Typography
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ChevronRightIcon /> Ingredients
          </Typography>
          <Divider />
          <Box sx={{ p: { xs: 1, sm: 1, md: 2 }, mt: 2 }}>
            {renderIngredients()}
          </Box>
          <Box sx={{ p: { xs: 1, sm: 1, md: 2 }, mt: 2 }}>{renderTraces()}</Box>
        </Box>
        <Alert severity="warning" sx={{ mt: 2 }}>
          Here, the <strong>Organic</strong> tag does not mean the product is
          grown organically (without using chemicals, including pesticides,
          fertilizers, etc.).
        </Alert>
        <Alert severity="info" sx={{ mt: 2 }}>
          <ul>
            <li>
              The <strong>INS No</strong> refers to the The International
              Numbering System for Food Additives.
            </li>
            <li>
              The <strong>Additive</strong> tag refers to the Food Additives.
            </li>
          </ul>
        </Alert>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const db = await connect();
  const col = db.collection('food-ingredients');
  const cursor = col.find({ slug }, { projection: { _id: 0 } });

  const records = JSON.parse(JSON.stringify(await cursor.toArray()));
  return {
    props: {
      data: {
        record: records[0],
        R2_DOMAIN: process.env.R2_DOMAIN,
      },
    },
  };
}
