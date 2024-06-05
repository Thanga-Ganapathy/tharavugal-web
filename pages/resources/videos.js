import Layout from '@/components/layouts/DefaultLayout';
import { Box, Paper, Typography } from '@mui/material';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import { getDB } from '@/lib/db';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import Resource from '@/components/Resource';

export default function Videos({ data }) {
  return (
    <Layout title="Videos - Resources">
      <Box textAlign="center">
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VideoCameraBackOutlinedIcon
            sx={{ fontSize: '48px', color: (t) => t.palette.secondary.main }}
          />{' '}
          <Box>Videos - Resources</Box>
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
          {data.videos.map((im, i) => (
            <Resource key={i} data={im} domain={data.R2_DOMAIN} />
          ))}
        </Box>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps() {
  const db = await getDB();
  const col = db.collection('resources');
  const cursor = col
    .find(
      { type: 2 },
      {
        projection: {
          _id: 0,
        },
      }
    )
    .sort({ updatedAt: -1 })
    .limit(10);

  const videos = JSON.parse(JSON.stringify(await cursor.toArray()));
  return {
    props: {
      data: {
        videos,
        R2_DOMAIN: process.env.R2_DOMAIN,
      },
    },
  };
}
