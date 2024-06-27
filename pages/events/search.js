import Form from '@/components/home/tools/events/search/Form';
import List from '@/components/home/tools/events/search/List';
import Layout from '@/components/layouts/DefaultLayout';
import APIClient from '@/utils/APIClient';
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Pagination,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import useAlert from '@/hooks/useAlert';
import { produce } from 'immer';
import { format } from 'date-fns';
import { setAutoFreeze } from 'immer';
import HeadingWithDivider from '@/components/HeadingWithDivider';

export default function Search() {
  const [state, setState] = useState({
    events: [],
    loading: false,
  });
  const showAlert = useAlert();
  const initialValues = {
    text: '',
    locations: [],
    locationsMatch: 'Match All',
    tags: [],
    tagsMatch: 'Match All',
    from: null,
    to: null,
    sort: 'Descending',
  };

  const handleSubmit = async (values) => {
    setState({ ...state, loading: true });
    setAutoFreeze(false);
    const data = produce(values, (draft) => {
      if (draft.from) {
        draft.from = format(values.from, 'yyyy-MM-dd');
      }
      if (draft.to) {
        draft.to = format(values.to, 'yyyy-MM-dd');
      }
    });
    try {
      const response = await APIClient.post('/api/events/search', data);
      setState({
        ...state,
        events: response.data.events,
        meta: response.data.meta[0],
        loading: false,
      });
    } catch (error) {
      setState({ ...state, loading: false });
      showAlert('error', 'Server Error, please try again later...');
    }
  };

  return (
    <Layout title="Real-Time Events Search">
      <Box textAlign="center">
        <Typography variant="h6">Search - Real-Time Events</Typography>
      </Box>
      <Box
        sx={{
          p: { xs: 1, sm: 1, md: 2 },
          display: { xs: 'flex', sm: 'flex', md: 'grid' },
          flexDirection: { xs: 'column', sm: 'column' },
          gridTemplateColumns: '25fr 75fr',
          columnGap: 3,
        }}
      >
        <Paper sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
          <HeadingWithDivider title="Filter" />
          <Form initialValues={initialValues} onSubmit={handleSubmit} />
        </Paper>
        <Paper sx={{ mt: { xs: 1, sm: 2, md: 0 }, p: { xs: 1, sm: 1, md: 2 } }}>
          <HeadingWithDivider title="Results" />
          {state.events.length > 0 && !state.loading && (
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Chip
                variant="outlined"
                color="success"
                label={`Showing: 1 - ${state.events.length} of ${state.meta.total}`}
                size="small"
              />
            </Box>
          )}
          {state.events.length === 0 && !state.loading && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No result.
            </Alert>
          )}
          {state.loading && (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              <CircularProgress />
            </Typography>
          )}
          <Box sx={{ mt: 2 }}>
            {!state.loading && <List events={state.events} />}
          </Box>
          {state.events.length > 0 && !state.loading && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination count={1} disabled />
              </Box>
              <Alert severity="warning" sx={{ mt: 5 }}>
                Due to our current infrastructure limitations, we can only show
                a limited set of results here.
              </Alert>
            </>
          )}
        </Paper>
      </Box>

      <Alert severity="warning">
        Note: The data shown here is based on recorded Real-Time events.
      </Alert>
    </Layout>
  );
}
