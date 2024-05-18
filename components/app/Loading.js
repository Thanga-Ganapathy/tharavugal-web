import { Box, CircularProgress, Typography } from '@mui/material';
import AppHeader from '../layouts/AppHeader';

export default function Loading() {
  return (
    <>
      <AppHeader />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Box sx={{ color: '#FF851B' }}>
          <CircularProgress color="success" />
        </Box>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Please wait..
        </Typography>
      </Box>
    </>
  );
}
