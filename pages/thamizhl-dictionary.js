import Layout from '@/components/layouts/DefaultLayout';
import { Box, Paper, Typography, Alert } from '@mui/material';
import { connect } from '@/utils/db';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import { Form } from '@opentf/react-form';
import SearchIcon from '@mui/icons-material/Search';
import { Field } from '@opentf/react-form';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import APIClient from '@/utils/APIClient';
import ThamizhlWord from '@/components/thamizhlDictionary/ThamizhlWord';

function SearchForm({ isLoading, onSubmit }) {
  return (
    <Box
      component={Form}
      initialValues={{ searchText: '' }}
      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      onSubmit={onSubmit}
    >
      <Box
        name="searchText"
        type="search"
        component={Field}
        sx={(theme) => ({
          width: { xs: '75%', md: '40%' },
          padding: '15px',
          borderRadius: '15px',
          border: '1px solid gray',
          outlineColor: theme.palette.primary.light,
        })}
        placeholder="Type here..."
      />
      <LoadingButton
        sx={{ ml: 2 }}
        type="submit"
        loading={isLoading}
        loadingPosition="start"
        startIcon={<SearchIcon />}
        variant="contained"
        size="medium"
      >
        <span>Search</span>
      </LoadingButton>
    </Box>
  );
}

export default function ThamizhlDictionary({ data }) {
  const [state, setState] = useState({
    search: false,
    searching: false,
    searchList: [],
  });

  const handleSearch = async (values) => {
    console.log(values);
    setState((s) => ({ ...s, searching: true }));
    const res = await APIClient.get(
      '/api/thamizhl-dictionary?q=' + values.searchText
    );
    console.log(res);
    setState((s) => ({
      ...s,
      search: true,
      searching: false,
      searchList: res.data,
    }));
  };

  return (
    <Layout title="அகராதி - Thamizhl Dictionary">
      <Box textAlign="center">
        <Typography variant="h5">அகராதி - Thamizhl Dictionary</Typography>
      </Box>
      <Paper sx={{ p: 2 }}>
        <SearchForm isLoading={state.searching} onSubmit={handleSearch} />
        {state.search && (
          <Box sx={{ mb: 2 }}>
            <HeadingWithDivider title="Search result" />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {state.searchList.length === 0 && (
                <Alert sx={{ mt: 2 }} severity="warning">
                  No data found...
                </Alert>
              )}
              {state.searchList.map((w, i) => (
                <ThamizhlWord data={w} key={i} />
              ))}
            </Box>
          </Box>
        )}
        <HeadingWithDivider title="Recent" />
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {data.words.map((w, i) => (
            <ThamizhlWord data={w} key={i} />
          ))}
        </Box>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const db = await connect();
  const col = db.collection('thamizhl-dictionary');
  const cursor = col
    .find(
      {},
      {
        projection: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      }
    )
    .sort({ updatedAt: -1 })
    .limit(10);

  const words = await cursor.toArray();

  return {
    props: {
      data: {
        words,
      },
    },
  };
}
