import ExploreForm from '@/components/explore/Form';
import List from '@/components/explore/List';
import Layout from '@/components/layouts/DefaultLayout';
import APIClient from '@/utils/APIClient';
import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import useAlert from '@/hooks/useAlert';
import { produce } from 'immer';
import { format } from 'date-fns';
import { setAutoFreeze } from 'immer';
import HeadingWithDivider from '@/components/HeadingWithDivider';

export default function Explore() {
  const [state, setState] = useState({
    events: [],
    loading: false,
  });
  const showAlert = useAlert();
  const initialValues = {
    text: '',
    locations: [],
    tags: [],
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
      const response = await APIClient.post('/api/explore', data);
      setState({ ...state, events: response.data.events, loading: false });
    } catch (error) {
      setState({ ...state, loading: false });
      showAlert('error', 'Server Error, please try again later...');
    }
  };

  return (
    <Layout title="Explore">
      <Box textAlign="center">
        <Typography variant="h5">Explore</Typography>
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
          <ExploreForm initialValues={initialValues} onSubmit={handleSubmit} />
        </Paper>
        <Paper sx={{ mt: { xs: 1, sm: 2, md: 0 }, p: { xs: 1, sm: 1, md: 2 } }}>
          <HeadingWithDivider title="Real-Time Events" />
          {state.events.length === 0 && !state.loading && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No result...
            </Alert>
          )}
          {state.loading && (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              <CircularProgress />
            </Typography>
          )}
          <Box>{!state.loading && <List events={state.events} />}</Box>
          <Alert severity="warning">
            Due to our current infrastructure limitations, we can only show a
            limited set of results here.
          </Alert>
        </Paper>
      </Box>
    </Layout>
  );
}
