import { Box, Paper, Typography } from '@mui/material';
import useSWR from 'swr';

import Layout from '@/components/layouts/AdminLayout';
import Sidebar from '@/components/admin/Sidebar';
import List from '@/components/admin/feedbacks/List';

export default function Feedbacks() {
  const { data: feedbacks, isLoading } = useSWR('/api/admin/feedbacks');

  return (
    <Layout>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <Box>
          <Sidebar />
        </Box>
        <Box p={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Feedbacks</Typography>
          </Box>
          <Paper sx={{ mt: 2 }}>
            <List isLoading={isLoading} data={feedbacks?.data} />
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
}
