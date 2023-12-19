import Layout from '@/components/layouts/DefaultLayout';
import { Box, Chip, Paper, Typography } from '@mui/material';
import Info from '@/components/thirukkural/Info';
import Chapters from '@/components/thirukkural/Chapters';
import { thirukkural } from '@/data/thirukkural';
import Kural from '@/components/thirukkural/Kural';

export default function Thirukkural() {
  const randomKural = thirukkural.chapters.find(
    (c) => c.name === 'அறன் வலியுறுத்தல்'
  ).kurals[8];

  return (
    <Layout title="Thirukkural">
      <Box textAlign="center">
        <Typography variant="h5">திருக்குறள் (Thirukkural)</Typography>
      </Box>
      <Box mt={2}>
        <Box sx={{ position: 'relative' }}>
          <Chip
            label="Random"
            variant="filled"
            color="secondary"
            size="small"
            sx={{ position: 'absolute', right: '15px', top: '5px' }}
          />
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
