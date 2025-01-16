'use client';

import { Box, Paper } from '@mui/material';

import Events from '@/components/Events';

// import styles from './index.module.css';
import Tools from './tools';
import Resources from './Resources';
import FeaturedVisualizations from './FeaturedVisualizations';
import RecentDiscussions from './RecentDiscussions';
import RecentEntities from './RecentEntities';
import Sections from './Sections';
import Stats from './Stats';
import ThamizhlTools from './ThamizhlTools';
import RecentOpenIssues from './RecentOpenIssues';
import RecentAnnouncements from './RecentAnnouncements';
import TagsSuggestion from './TagsSuggestion';
import GlobalSearch from './GlobalSearch';
import DidYouKnow from './DidYouKnow';
import PinnedReport from './PinnedReport';
import ResearchProjects from './ResearchProjects';

export default function Home() {
  return (
    <Box>
      <Box sx={{ mt: { xs: 2, sm: 1, md: 0 } }}>
        <GlobalSearch />
      </Box>
      <Box
        sx={{
          display: { md: 'grid' },
          gridTemplateColumns: '70fr 30fr',
          columnGap: 2,
        }}
      >
        <Box>
          <Events />

          <Paper sx={{ mt: 2 }}>
            <Resources />
          </Paper>

          <Paper sx={{ mt: 2 }}>
            <Sections />
          </Paper>

          <Paper sx={{ mt: 2 }}>
            <ResearchProjects />
          </Paper>
        </Box>
        <Box>
          <Paper sx={{ mt: { xs: 2, sm: 0 } }}>
            <PinnedReport />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <Stats />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <DidYouKnow />
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
    </Box>
  );
}
