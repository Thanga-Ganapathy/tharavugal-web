import Layout from '@/components/layouts/DefaultLayout';
import StatsBox from '@/components/stats/StatsBox';
import { connect } from '@/utils/db';
import { Box, Paper, Typography } from '@mui/material';

export default function Statistics({ data }) {
  const imagesCount = data.statsRecords.find(
    (r) => r.groupName === 'Resources' && r.name === 'Image'
  )?.value;
  const videosCount = data.statsRecords.find(
    (r) => r.groupName === 'Resources' && r.name === 'Video'
  )?.value;
  const audiosCount = data.statsRecords.find(
    (r) => r.groupName === 'Resources' && r.name === 'Audio'
  )?.value;
  const docsCount = data.statsRecords.find(
    (r) => r.groupName === 'Resources' && r.name === 'Document'
  )?.value;
  const booksCount = data.statsRecords.find(
    (r) => r.groupName === 'Resources' && r.name === 'Book'
  )?.value;
  const thamizhlDictCount = data.statsRecords.find(
    (r) => r.groupName === 'Thamizhl Dictionary' && r.name === 'Default'
  )?.value;

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
          <StatsBox name="Images" count={imagesCount} />
          <StatsBox name="Videos" count={videosCount} />
          <StatsBox name="Audios" count={audiosCount} />
          <StatsBox name="Documents" count={docsCount} />
          <StatsBox name="Books" count={booksCount} />
          <StatsBox name="Entities" count={0} />
          <StatsBox name="Open Issues" count={0} />
          <StatsBox
            name="Thamizhl Dictionary"
            count={thamizhlDictCount}
          />
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
  const statsCol = db.collection('statistics');
  const statsRecords = await statsCol
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return {
    props: {
      data: {
        totalEvents,
        totalTags,
        totalLocations,
        totalContLogs,
        statsRecords,
      },
    },
  };
}
