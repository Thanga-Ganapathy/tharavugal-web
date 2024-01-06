import Layout from '@/components/layouts/DefaultLayout';
import {
  Box,
  Chip,
  Paper,
  Typography,
  Alert,
  AlertTitle,
  Badge,
} from '@mui/material';
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
        <Badge badgeContent="BETA" color="warning">
          <Typography variant="h5">திருக்குறள் (Thirukkural)</Typography>
        </Badge>
      </Box>
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
            <Kural data={randomKural} />
            <Info />
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
