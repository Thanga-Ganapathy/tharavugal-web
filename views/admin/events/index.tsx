'use client';

import SearchForm from '@/components/SearchForm';
import List from './List';
import New from './New';
import DialogWindow from '@/components/DialogWindow';
import { useState } from 'react';
import useSWR from 'swr';
import APIClient from '@/utils/APIClient';
import { Box, Button, Typography } from '@mui/material';

export default function Events() {
  const [state, setState] = useState({
    search: false,
    isSearching: false,
    searchData: [],
  });
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/events?page=' + (page + 1)
  );

  const handleClose = () => {
    setOpen(false);
    mutate();
  };

  const handleSearch = async (values) => {
    setState((s) => ({ ...s, isSearching: true, search: true }));
    const res = await APIClient.get('/api/admin/events?q=' + values.searchText);
    setState({ isSearching: false, search: true, searchData: res.data.events });
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Events</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New
        </Button>
      </Box>
      <SearchForm
        isLoading={state.isSearching}
        onSubmit={handleSearch}
        onClear={() =>
          setState({ search: false, isSearching: false, searchData: [] })
        }
      />
      <List
        isLoading={isLoading}
        data={state.search ? state.searchData : data?.data.events}
        page={page}
        setPage={setPage}
        mutate={mutate}
        rowCount={data?.data?.total}
      />
      <DialogWindow
        open={open}
        onClose={handleClose}
        title="New Event"
        variant="medium"
      >
        <New onClose={handleClose} />
      </DialogWindow>
    </>
  );
}
