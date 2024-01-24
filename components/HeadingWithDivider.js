import { Box, Divider, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function HeadingWithDivider({ title, sx }) {
  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> {title}
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
    </Box>
  );
}
