import { useRouter } from 'next/router';
import { Box, Paper, Alert } from '@mui/material';

import Layout from '@/components/layouts/DefaultLayout';
import Events from '@/components/Events';
import { connect } from '@/utils/db';

import styles from './index.module.css';
import SearchForm from '@/components/home/SearchForm';
import Tools from '@/components/home/tools';
import Resources from '@/components/home/Resources';
import FeaturedVisualizations from '@/components/home/FeaturedVisualizations';
import RecentDiscussions from '@/components/home/RecentDiscussions';
import RecentEntities from '@/components/home/RecentEntities';
import Links from '@/components/home/Links';
import Stats from '@/components/home/Stats';
import ThamizhlTools from '@/components/home/ThamizhlTools';
import RecentOpenIssues from '@/components/home/RecentOpenIssues';

export default function Home({ data }) {
  const router = useRouter();

  return (
    <Layout title="Home">
      <Box sx={{ mt: { xs: 2, sm: 1, md: 0 } }}>
        <SearchForm
          onSubmit={(values) => {
            router.push('/search?q=' + values.searchText);
          }}
        />
      </Box>
      <Box
        sx={{
          display: { md: 'grid' },
          gridTemplateColumns: '70fr 30fr',
          columnGap: 2,
        }}
      >
        <Box>
          <Events data={data.events} styles={styles} />
          <Paper sx={{ mt: 2 }}>
            <Resources />
          </Paper>
        </Box>
        <Box>
          <Paper sx={{ mt: { xs: 2, sm: 0 } }}>
            <Stats
              data={{
                totalEvents: data.totalEvents,
                totalTags: data.totalTags,
                totalLocations: data.totalLocations,
              }}
            />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <Tools />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <ThamizhlTools />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <FeaturedVisualizations />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <RecentDiscussions />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <RecentOpenIssues />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <RecentEntities />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <Links />
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const db = await connect();
  const eventsCol = db.collection('events');
  const cursor = eventsCol.aggregate([
    {
      $match: {
        status: 'Published',
      },
    },
    {
      $sort: {
        startedAt: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        title: 1,
        slug: 1,
        locations: 1,
        startedAt: 1,
        startTz: 1,
        categories: 1,
      },
    },
  ]);

  const events = JSON.parse(JSON.stringify(await cursor.toArray()));
  const totalEvents = await eventsCol.estimatedDocumentCount();
  const tagsCol = db.collection('event-categories');
  const totalTags = await tagsCol.estimatedDocumentCount();
  const loctaionsCol = db.collection('event-locations');
  const totalLocations = await loctaionsCol.estimatedDocumentCount();
  return {
    props: {
      data: {
        events,
        totalEvents,
        totalTags,
        totalLocations,
      },
    },
  };
}
