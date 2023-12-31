import Layout from '@/components/layouts/DefaultLayout';
import { Box, Paper, Typography } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { connect } from '@/utils/db';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import Resource from '@/components/Resource';

export default function Images({ data }) {
  return (
    <Layout title="Images - Resources">
      <Box textAlign="center">
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageOutlinedIcon
            sx={{ fontSize: '48px', color: (t) => t.palette.secondary.main }}
          />{' '}
          <Box>Images - Resources</Box>
          <Box />
        </Typography>
      </Box>
      <Paper sx={{ p: 2 }}>
        <HeadingWithDivider title="Recent Uploads" />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            mt: 2,
          }}
        >
          {data.images.map((im, i) => (
            <Resource key={i} data={im} domain={data.R2_DOMAIN} />
          ))}
        </Box>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const db = await connect();
  const col = db.collection('resources');
  const cursor = col
    .find(
      { type: 1 },
      {
        projection: {
          _id: 0,
        },
      }
    )
    .sort({ updatedAt: -1 })
    .limit(10);

  const images = JSON.parse(JSON.stringify(await cursor.toArray()));
  return {
    props: {
      data: {
        images,
        R2_DOMAIN: process.env.R2_DOMAIN,
      },
    },
  };
}
