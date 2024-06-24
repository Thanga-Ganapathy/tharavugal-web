import Layout from '@/components/layouts/DefaultLayout';
import { Alert, Box, Paper, Typography } from '@mui/material';

export default function ThamizhlGrammarEngine() {
  return (
    <Layout title="Thamizhl Grammar Engine">
      <Box textAlign="center">
        <Typography variant="h6">
          Thamizhl Grammar Engine - Research Projects
        </Typography>
      </Box>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Alert severity="info">The details will be updated soon.</Alert>
      </Paper>
    </Layout>
  );
}
