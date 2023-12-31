import Layout from '@/components/layouts/DefaultLayout';
import { Box, Paper, Typography } from '@mui/material';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { connect } from '@/utils/db';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import Resource from '@/components/Resource';

export default function Books({ data }) {
  return (
    <Layout title="Books - Resources">
      <Box textAlign="center">
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LibraryBooksOutlinedIcon
            sx={{ fontSize: '48px', color: (t) => t.palette.secondary.main }}
          />{' '}
          <Box>Books - Resources</Box>
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
          {data.books.map((im, i) => (
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
      { type: 5 },
      {
        projection: {
          _id: 0,
        },
      }
    )
    .sort({ updatedAt: -1 });

  const books = JSON.parse(JSON.stringify(await cursor.toArray()));
  return {
    props: {
      data: {
        books,
        R2_DOMAIN: process.env.R2_DOMAIN,
      },
    },
  };
}
