import { Box, Alert, Paper } from '@mui/material';

export default function UnityBanner() {
  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Paper>
        <Alert severity="warning" variant="standard">
          ஒற்றுமை இழந்த சமூகம் அழிந்து போகும்.
        </Alert>
      </Paper>
    </Box>
  );
}
