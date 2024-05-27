import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import useSWR from 'swr';

import Layout from '@/components/layouts/AdminLayout';
import Sidebar from '@/components/admin/Sidebar';
import DialogWindow from '@/components/DialogWindow';
import New from '@/components/admin/eventLocations/New';
import List from '@/components/admin/eventLocations/List';
import SearchForm from '@/components/SearchForm';
import APIClient from '@/utils/APIClient';

export default function EventLocations() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    search: false,
    isSearching: false,
    searchData: [],
  });
  const {
    data: eventLocations,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/event-locations');

  const handleClose = () => {
    setOpen(false);
    mutate();
  };

  const handleSearch = async (values) => {
    setState({ isSearching: true, search: true });
    const res = await APIClient.get(
      '/api/event-locations?q=' + values.searchText
    );
    setState({ isSearching: false, search: true, searchData: res.data });
  };

  return (
    <Layout>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <Box>
          <Sidebar />
        </Box>
        <Box p={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Event Locations</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
              New
            </Button>
          </Box>
          <Paper sx={{ mt: 2 }}>
            <SearchForm
              isLoading={state.isSearching}
              onSubmit={handleSearch}
              onClear={() =>
                setState({ search: false, isSearching: false, searchData: [] })
              }
            />
            <List
              data={state.search ? state.searchData : eventLocations?.data}
              loading={isLoading || state.isSearching}
            />
          </Paper>

          <DialogWindow
            open={open}
            onClose={handleClose}
            title="New Event Location"
          >
            <New onClose={handleClose} />
          </DialogWindow>
        </Box>
      </Box>
    </Layout>
  );
}
