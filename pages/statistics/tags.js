import Layout from '@/components/layouts/DefaultLayout';
import StatsBox from '@/components/stats/StatsBox';
import APIClient from '@/utils/APIClient';
import { connect } from '@/utils/db';
import {
  Alert,
  Box,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';

const alphabets = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export default function Tags({ data }) {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(data.tags);
  const [alphabet, setAlphabet] = useState('a');

  async function fetchTags(alp) {
    const response = await APIClient.get('/api/statistics/tags/' + alp);
    return response.data;
  }

  return (
    <Layout title="Tags - Statistics">
      <Box textAlign="center">
        <Typography variant="h5">Tags - Statistics</Typography>
      </Box>
      <Paper variant="outlined" sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={alphabet}
            onChange={async (_e, v) => {
              if (v) {
                setAlphabet(v);
                setLoading(true);
                const data = await fetchTags(v);
                setTags(data);
                setLoading(false);
              }
            }}
            sx={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {alphabets.map((alp, i) => (
              <ToggleButton key={i} value={alp}>
                {alp}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {loading && <CircularProgress />}
          </Box>
          <Box sx={{ display: loading ? 'none' : 'initial' }}>
            {tags.length === 0 && <Alert severity="info">No tags found.</Alert>}
          </Box>
          <Box sx={{ display: loading ? 'none' : 'flex', flexWrap: 'wrap' }}>
            {tags.map((t, i) => (
              <StatsBox key={i} count={t.count} name={t.tag} href={`/events/search?tag=${t.tag}`} />
            ))}
          </Box>
        </Box>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps() {
  const db = await connect();
  const eventsCol = db.collection('events');
  const aggrData = eventsCol.aggregate([
    {
      $unwind: {
        path: '$categories',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        categories: {
          $regex: new RegExp('^a', 'i'),
        },
      },
    },
    {
      $group: {
        _id: '$categories',
        count: {
          $count: {},
        },
      },
    },
    {
      $addFields: {
        tag: '$_id',
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        tag: 1,
      },
    },
  ]);

  return {
    props: {
      data: {
        tags: await aggrData.toArray(),
      },
    },
  };
}
