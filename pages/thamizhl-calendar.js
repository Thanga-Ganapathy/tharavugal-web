import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import { Alert, Box, Typography } from '@mui/material';

export default function ThamizhlCalendar() {
  return (
    <Layout title="Thamizhl Calendar">
      <Box textAlign="center">
        <Typography variant="h4">Thamizhl Calendar</Typography>
      </Box>
      <Alert severity="warning">
        Work in Pipeline, please follow the{' '}
        <Link href="/work-pipeline">Work Pipeline</Link> for updates.
      </Alert>
    </Layout>
  );
}
