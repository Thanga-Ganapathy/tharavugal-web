import Layout from '@/components/layouts/DefaultLayout';
import { Alert, Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function KB() {
  return (
    <Layout title="KnowledgeBase">
      <Box textAlign="center">
        <Typography variant="h4">Knowledge Base</Typography>
      </Box>
      <Alert severity="warning">
        Work in Pipeline, please follow the{' '}
        <Link href="/work-pipeline">Work Pipeline</Link> for updates.
      </Alert>
    </Layout>
  );
}
