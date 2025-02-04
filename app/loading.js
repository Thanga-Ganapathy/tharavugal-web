import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ color: '#FF851B' }}>
        <CircularProgress color="success" />
      </Box>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Please wait..
      </Typography>
    </Box>
  );
}
