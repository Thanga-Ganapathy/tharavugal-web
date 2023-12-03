import Layout from '@/components/layouts/DefaultLayout';
import StatsBox from '@/components/stats/StatsBox';
import { connect } from '@/utils/db';
import { Alert, Box, Paper, Typography } from '@mui/material';
import Link from 'next/link';

export default function Statistics({ data }) {
  return (
    <Layout title="Statistics">
      <Box textAlign="center">
        <Typography variant="h5">Statistics</Typography>
      </Box>
      <Paper variant="outlined" sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
        <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <StatsBox name="Real-Time Events" count={data.totalEvents} />
          <StatsBox
            name="Tags"
            count={data.totalTags}
            href="/statistics/tags"
          />
          <StatsBox
            name="Locations"
            count={data.totalLocations}
            href="/statistics/locations"
          />
          <StatsBox name="Contributions" count={data.totalContLogs} />
          <StatsBox name="Images" count={0} />
          <StatsBox name="Videos" count={0} />
          <StatsBox name="Documents" count={0} />
          <StatsBox name="Books" count={0} />
          <StatsBox name="Entities" count={0} />
          <StatsBox name="Open Issues" count={0} />
        </Box>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const db = await connect();
  const eventsCol = db.collection('events');
  const totalEvents = await eventsCol.estimatedDocumentCount();
  const tagsCol = db.collection('event-categories');
  const totalTags = await tagsCol.estimatedDocumentCount();
  const loctaionsCol = db.collection('event-locations');
  const totalLocations = await loctaionsCol.estimatedDocumentCount();
  const contLogsCol = db.collection('contribution-logs');
  const totalContLogs = await contLogsCol.estimatedDocumentCount();
  return {
    props: {
      data: {
        totalEvents,
        totalTags,
        totalLocations,
        totalContLogs,
      },
    },
  };
}
