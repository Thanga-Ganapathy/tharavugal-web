import Layout from '@/components/layouts/DefaultLayout';
import { Box, Paper, Typography, Alert, Badge } from '@mui/material';
import Info from '@/components/thirukkural/Info';
import Chapters from '@/components/thirukkural/Chapters';
import { thirukkural } from '@/data/thirukkural';
import Kural from '@/components/thirukkural/Kural';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import Search from '@/components/thirukkural/Search';

export default function Thirukkural() {
  const randomKural = thirukkural.chapters.find(
    (c) => c.name === 'அறன் வலியுறுத்தல்'
  ).kurals[8];

  return (
    <Layout title="Thirukkural">
      <Box textAlign="center">
        <Badge badgeContent="BETA" color="warning">
          <Typography variant="h6">திருக்குறள் (Thirukkural)</Typography>
        </Badge>
      </Box>

      <Search />

      <Box mt={1}>
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
            <Kural data={randomKural} chapter="அறன்-வலியுறுத்தல்" />
            <Paper sx={{ p: { xs: 1, sm: 2 } }}>
              <HeadingWithDivider title="Facts" sx={{ mb: 2 }} />
              <Info />
            </Paper>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Alert severity="warning">
          The chapters and kurals have been ordered based on the alphabet.
        </Alert>
      </Box>
    </Layout>
  );
}
