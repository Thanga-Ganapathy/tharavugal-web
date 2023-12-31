import { Box, Divider, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StatsBox from '../stats/StatsBox';

export default function Stats({ data }) {
  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> Stats
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />

      <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <StatsBox name="Real-Time Events" count={data.totalEvents} />
        <StatsBox name="Tags" count={data.totalTags} href="/statistics/tags" />
        <StatsBox
          name="Locations"
          count={data.totalLocations}
          href="/statistics/locations"
        />
      </Box>

      <Box
        component={Link}
        href="/statistics"
        sx={{ display: 'flex', justifyContent: 'right' }}
      >
        View All <KeyboardDoubleArrowRightIcon />{' '}
      </Box>
    </Box>
  );
}
