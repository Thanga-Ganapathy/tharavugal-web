import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import useSWR from 'swr';

import Layout from '@/components/layouts/AdminLayout';
import Sidebar from '@/components/admin/Sidebar';
import DialogWindow from '@/components/DialogWindow';
import New from '@/components/admin/contributionLogs/New';
import List from '@/components/admin/contributionLogs/List';

export default function ContributionLogs() {
  const [open, setOpen] = useState(false);
  const {
    data: contributionLogs,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/admin/contribution-logs');

  const handleClose = () => {
    setOpen(false);
    mutate();
  };

  return (
    <Layout>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <Box>
          <Sidebar />
        </Box>
        <Box p={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Contribution Logs</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
              New
            </Button>
          </Box>
          <Paper sx={{ mt: 2 }}>
            <List data={contributionLogs?.data} />
          </Paper>

          <DialogWindow
            open={open}
            onClose={handleClose}
            title="New Contribution Log"
          >
            <New onClose={handleClose} />
          </DialogWindow>
        </Box>
      </Box>
    </Layout>
  );
}
