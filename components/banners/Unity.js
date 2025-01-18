import { Box, Alert, Paper, Typography } from '@mui/material';

export default function UnityBanner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Alert severity="warning" variant="filled" sx={{ py: 0 }}>
        <Typography>ஒற்றுமை இழந்த சமூகம் அழிந்து போகும்.</Typography>
      </Alert>
    </Box>
  );
}
