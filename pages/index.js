import { useRouter } from 'next/router';
import { Box, Paper } from '@mui/material';

import Layout from '@/components/layouts/DefaultLayout';
import Events from '@/components/Events';

import styles from './index.module.css';
import SearchForm from '@/components/home/SearchForm';
import Tools from '@/components/home/tools';
import Resources from '@/components/home/Resources';
import FeaturedVisualizations from '@/components/home/FeaturedVisualizations';
import RecentDiscussions from '@/components/home/RecentDiscussions';
import RecentEntities from '@/components/home/RecentEntities';
import Sections from '@/components/home/Sections';
import Stats from '@/components/home/Stats';
import ThamizhlTools from '@/components/home/ThamizhlTools';
import RecentOpenIssues from '@/components/home/RecentOpenIssues';
import RecentAnnouncements from '@/components/home/RecentAnnouncements';
import TagsSuggestion from '@/components/home/TagsSuggestion';
import useSWR from 'swr';

export default function Home() {
  const router = useRouter();
  const { data: events, error, isLoading } = useSWR('/api/events');

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
          <Events
            data={events?.data}
            error={error}
            isLoading={isLoading}
            styles={styles}
          />
          <Paper sx={{ mt: 2 }}>
            <Resources />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <Sections />
          </Paper>
        </Box>
        <Box>
          <Paper sx={{ mt: { xs: 2, sm: 0 } }}>
            <Stats />
          </Paper>

          <Paper sx={{ mt: 2 }}>
            <TagsSuggestion />
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
            <RecentAnnouncements />
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
}
