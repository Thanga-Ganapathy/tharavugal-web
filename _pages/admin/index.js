import { Box } from '@mui/material';
import Layout from '@/components/layouts/AdminLayout';
import Sidebar from '@/components/admin/Sidebar';
import Dashboard from '@/components/admin/dashboard';

export default function Admin({ data }) {
  return (
    <Layout>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <Box>
          <Sidebar />
        </Box>
        <Box>
          <Dashboard />
        </Box>
      </Box>
    </Layout>
  );
}
