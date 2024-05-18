import { Box, Divider, Typography } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StatsBox from '../stats/StatsBox';
import { FcStatistics } from 'react-icons/fc';
import { ThreeDots } from 'react-loader-spinner';
import useSWR from 'swr';
import Link from '../app/Link';

export default function Stats() {
  const { data: stats, error, isLoading } = useSWR('/api/quick-stats');

  const renderBoxes = () => {
    if (stats) {
      return (
        <>
          <StatsBox name="Real-Time Events" count={stats.data.events} />
          <StatsBox
            name="Tags"
            count={stats.data.tags}
            href="/statistics/tags"
          />
          <StatsBox
            name="Locations"
            count={stats.data.locations}
            href="/statistics/locations"
          />
        </>
      );
    }
  };

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
        {error && !isLoading && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            ❗Failed to load
          </Box>
        )}
        {isLoading && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <ThreeDots
              visible={true}
              height="35"
              width="35"
              color="#2ECC40"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </Box>
        )}
        {stats && renderBoxes()}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          mt: 2,
        }}
      >
        <Link
          href="/statistics"
          sx={{ display: 'flex', fontSize: '14px', alignItems: 'center' }}
        >
          View All <KeyboardDoubleArrowRightIcon fontSize="small" />
        </Link>
      </Box>
    </Box>
  );
}
