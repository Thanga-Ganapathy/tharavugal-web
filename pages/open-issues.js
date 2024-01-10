import SearchForm from '@/components/home/SearchForm';
import Layout from '@/components/layouts/DefaultLayout';
import { Masonry } from '@mui/lab';
import { Alert, Box, Card, Chip, Paper, Typography } from '@mui/material';
import Link from 'next/link';

function IssueBox({ title }) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Alert severity="warning">This is a sample issue.</Alert>
        </Box>
        <Box>
          <Chip label="@My Location" />
        </Box>
      </Box>
    </Paper>
  );
}

export default function OpenIssues() {
  const data = [
    'The Road is damaged & full of potholes.',
    'Medical waste is dumped in our area pond',
    'No drinking water supply exists in our village.',
  ];

  return (
    <Layout title="Open Issues">
      <Box textAlign="center">
        <Typography variant="h4">Open Issues</Typography>
      </Box>
      <Alert severity="warning">
        Work in Pipeline, please follow the{' '}
        <Link href="/work-pipeline">Work Pipeline</Link> for updates.
      </Alert>
      <Alert severity="info" sx={{ mt: 1 }}>
        Members can file issues of any kind, track updates, etc.
      </Alert>
      <Box mt={2}>
        <SearchForm placeholder="Type here to search issues..." />
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Card
          variant="outlined"
          sx={{ p: 1, m: 1, textAlign: 'center', minWidth: '150px' }}
        >
          <Typography variant="h1">0</Typography>
          <Typography variant="subtitle1">OPEN</Typography>
        </Card>
        <Card
          variant="outlined"
          sx={{ p: 1, m: 1, textAlign: 'center', minWidth: '150px' }}
        >
          <Typography variant="h1">0</Typography>
          <Typography variant="subtitle1">IN PROGRESS</Typography>
        </Card>
        <Card
          variant="outlined"
          sx={{ p: 1, m: 1, textAlign: 'center', minWidth: '150px' }}
        >
          <Typography variant="h1">0</Typography>
          <Typography variant="subtitle1">CLOSED</Typography>
        </Card>
      </Box>
      <Box mt={2}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {data.map((d, i) => (
            <IssueBox key={i} title={d} />
          ))}
        </Masonry>
      </Box>
    </Layout>
  );
}
