import { Box, Paper, Typography, Alert, AlertTitle } from '@mui/material';

function InfoBox({ title, content }) {
  return (
    <Paper sx={{ minHeight: '50px', p: 2, textAlign: 'center', m: 1 }}>
      <Typography variant="h4">{content}</Typography>
      <Typography color="primary">{title}</Typography>
    </Paper>
  );
}

export default function Info() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <InfoBox title="Author(s)" content="Unknown" />
      <InfoBox title="Original Publication" content="Unknown" />
      <InfoBox title="Chapters" content="133" />
      <InfoBox title="Kurals" content="1,330" />
      <Paper>
        <Alert severity="info" variant="outlined">
          <AlertTitle>Info</AlertTitle>
          The <strong>Thiruthanigai Visakhaperumalayar</strong> and{' '}
          <strong>Arumuka Navalar</strong> from Yaalpaanam were the first known
          to copy thirukkural from palm script into a modern printing press.
        </Alert>
      </Paper>
    </Box>
  );
}
