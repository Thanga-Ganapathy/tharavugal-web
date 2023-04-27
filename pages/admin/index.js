import { Box } from '@mui/material';
import Layout from '@/components/layouts/AdminLayout';
import Sidebar from '@/components/admin/Sidebar';

export default function Admin() {
  return (
    <Layout>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <Box><Sidebar /></Box>
        <Box>Main</Box>
      </Box>
    </Layout>
  );
}