import { Box, Typography, Pagination, Alert } from '@mui/material';
import HeadingWithDivider from '../HeadingWithDivider';
import { FcIdea } from 'react-icons/fc';
import useSWRImmutable from 'swr/immutable';
import Link from '../app/Link';

export default function DidYouKnow() {
  const { data, error, isLoading } = useSWRImmutable('/api/did-you-know');

  return (
    <Box sx={{ p: 1 }}>
      <HeadingWithDivider title="Did you know?" icon={FcIdea} sx={{ px: 1 }} />
      <Box sx={{ p: 2 }}>
        {isLoading && 'Loading...'}
        {!isLoading && error && 'Failed to load.'}
        {!isLoading && !error && (
          <>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                wordBreak: 'break-word',
              }}
            >
              ⚡ This Year,{' '}
              <Box component="span" sx={{ color: (t) => t.palette.error.main }}>
                {data.count.killed}
              </Box>{' '}
              People were Killed and{' '}
              <Box component="span" sx={{ color: (t) => t.palette.error.main }}>
                {data.count.injury}
              </Box>{' '}
              People were Injured by Lightning Strikes.
            </Typography>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Link href="https://www.cdc.gov/lightning/safety/index.html">
                Safety Guidelines
              </Link>
            </Alert>

            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
              <Pagination count={1} disabled size="small" />
            </Box>

            <Alert severity="warning" sx={{ mt: 3, fontSize: '11px' }}>
              The data shown here is based on recorded Real-Time Events.
            </Alert>
          </>
        )}
      </Box>
    </Box>
  );
}
