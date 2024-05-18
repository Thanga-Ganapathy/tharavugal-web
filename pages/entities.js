import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import { Alert, Box, Typography } from '@mui/material';

export default function Entities() {
  return (
    <Layout title="Entities">
      <Box textAlign="center">
        <Typography variant="h4">Entities</Typography>
      </Box>
      <Alert severity="warning">
        Work in Pipeline, please follow the{' '}
        <Link href="/work-pipeline">Work Pipeline</Link> for updates.
      </Alert>
    </Layout>
  );
}
