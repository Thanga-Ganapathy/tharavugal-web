import Layout from '@/components/layouts/DefaultLayout';
import { Box, Paper, Typography } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { connect } from '@/utils/db';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import Resource from '@/components/Resource';

export default function Documents({ data }) {
  return (
    <Layout title="Documents - Resources">
      <Box textAlign="center">
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArticleOutlinedIcon
            sx={{ fontSize: '48px', color: (t) => t.palette.secondary.main }}
          />{' '}
          <Box>Documents - Resources</Box>
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
          {data.documents.map((im, i) => (
            <Resource key={i} data={im} domain={data.R2_DOMAIN} />
          ))}
        </Box>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps() {
  const db = await connect();
  const col = db.collection('resources');
  const cursor = col
    .find(
      { type: 4 },
      {
        projection: {
          _id: 0,
        },
      }
    )
    .sort({ updatedAt: -1 });

  const documents = JSON.parse(JSON.stringify(await cursor.toArray()));
  return {
    props: {
      data: {
        documents,
        R2_DOMAIN: process.env.R2_DOMAIN,
      },
    },
  };
}
