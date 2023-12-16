import Layout from '@/components/layouts/DefaultLayout';
import {
  Box,
  Chip,
  Paper,
  Typography,
} from '@mui/material';
import Info from '@/components/thirukkural/Info';
import Chapters from '@/components/thirukkural/Chapters';
import { thirukkural } from '@/data/thirukkural';
import Kural from '@/components/thirukkural/Kural';

export default function Thirukkural() {
  const randomKural = thirukkural.chapters.find(
    (c) => c.name === 'கடவுள் வாழ்த்து'
  ).kurals[0];

  return (
    <Layout title="Thirukkural">
      <Box textAlign="center">
        <Typography variant="h5">திருக்குறள் (Thirukkural)</Typography>
      </Box>
      <Box mt={2}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              position: 'absolute',
              right: '5px',
              top: '5px',
            }}
          >
            <Chip
              label="Random"
              variant="filled"
              color="secondary"
              size="small"
            />
          </Box>
          <Kural data={randomKural} />
        </Box>
        <Box
          sx={{
            display: {
              md: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridGap: '15px',
            },
          }}
        >
          <Paper sx={{ p: 2, mt: 2 }}>
            <Chapters />
          </Paper>
          <Box sx={{ mt: 2 }}>
            <Info />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
