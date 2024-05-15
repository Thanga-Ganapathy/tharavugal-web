import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import useSWR from 'swr';

import Layout from '@/components/layouts/AdminLayout';
import Sidebar from '@/components/admin/Sidebar';
import DialogWindow from '@/components/DialogWindow';
import New from '@/components/admin/events/New';
import List from '@/components/admin/events/List';
import SearchForm from '@/components/SearchForm';
import APIClient from '@/utils/APIClient';

export default function Events() {
  const [state, setState] = useState({
    search: false,
    isSearching: false,
    searchData: [],
  });
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { data, error, isLoading, mutate } = useSWR('/api/admin/events?page=' + page);

  const handleClose = () => {
    setOpen(false);
    mutate();
  };

  const handleSearch = async (values) => {
    setState({ isSearching: true, search: true });
    const res = await APIClient.get('/api/admin/events?q=' + values.searchText);
    setState({ isSearching: false, search: true, searchData: res.data.events });
  };

  return (
    <Layout>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <Box>
          <Sidebar />
        </Box>
        <Box p={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Events</Typography>
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
              data={state.search ? state.searchData : data?.data.events}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              mutate={mutate}
              rowCount={data?.data.total || 0}
            />
          </Paper>

          <DialogWindow open={open} onClose={handleClose} title="New Event" variant='medium'>
            <New onClose={handleClose} />
          </DialogWindow>
        </Box>
      </Box>
    </Layout>
  );
}
