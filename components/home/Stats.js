import { Box, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StatsBox from '../stats/StatsBox';
import { FcStatistics } from 'react-icons/fc';

export default function Stats({ data }) {
  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <FcStatistics
          style={{ width: '35px', height: '35px', marginRight: '10px' }}
        />{' '}
        Stats
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

      <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
        <Box component={Link} href="/statistics" sx={{ display: 'flex' }}>
          View All <KeyboardDoubleArrowRightIcon />
        </Box>
      </Box>
    </Box>
  );
}
