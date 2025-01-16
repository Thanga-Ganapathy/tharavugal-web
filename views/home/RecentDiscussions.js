import { Alert, Box, Divider, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function RecentDiscussions() {
  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> Recent Open Discussions
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box mt={1}>
        <Alert severity="info">No Data.</Alert>
      </Box>
    </Box>
  );
}
