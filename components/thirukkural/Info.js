import { Box, Paper, Typography } from '@mui/material';

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
      <InfoBox title="Chapters" content="133" />
      <InfoBox title="Kurals" content="1,330" />
    </Box>
  );
}
