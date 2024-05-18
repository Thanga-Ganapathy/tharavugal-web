import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import { Alert, Box, Typography } from '@mui/material';

export default function ContributingProcess() {
  return (
    <Layout title="Contributing Process">
      <Box textAlign="center">
        <Typography variant="h4">Contributing Process</Typography>
      </Box>
      <Alert severity="warning">
        Work in Pipeline, please follow the{' '}
        <Link href="/work-pipeline">Work Pipeline</Link> for updates.
      </Alert>
      <Box mt={2}>
        <Alert severity="info">
          Every contribution here must follow a process to ensure reliability.
          <br />
          <br />
          *The members of the organization will create the processes.
        </Alert>
      </Box>
    </Layout>
  );
}
