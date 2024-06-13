import { Box, Typography, Pagination, Alert } from '@mui/material';
import HeadingWithDivider from '../HeadingWithDivider';
import { FcIdea } from 'react-icons/fc';
import useSWRImmutable from 'swr/immutable';
import Link from '../app/Link';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function DidYouKnow() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWRImmutable('/api/did-you-know');

  const handleChange = (_e, value) => {
    setPage(value);
  };

  const renderLigtning = () => {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            wordBreak: 'break-word',
          }}
        >
          ⚡ This Year,{' '}
          <Box component="span" sx={{ color: (t) => t.palette.error.main }}>
            {data.lightning.count.killed}
          </Box>{' '}
          People were Killed and{' '}
          <Box component="span" sx={{ color: (t) => t.palette.error.main }}>
            {data.lightning.count.injury}
          </Box>{' '}
          People were Injured by Lightning Strikes.
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Link href="https://www.cdc.gov/lightning/safety/index.html">
            Safety Guidelines
          </Link>
        </Alert>
      </Box>
    );
  };

  const rendeSuddenDeaths = () => {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            wordBreak: 'break-word',
          }}
        >
          😱 This Year, there were{' '}
          <Box component="span" sx={{ color: (t) => t.palette.error.main }}>
            {data.suddenDeaths.count}
          </Box>{' '}
          Sudden Death Cases among People under the Age of 45 in the Republic of
          India.
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          Related Articles:
          <ul>
            <li>
              <Link href="https://journals.lww.com/ijmr/fulltext/2023/10000/factors_associated_with_unexplained_sudden_deaths.6.aspx">
                Article 1
              </Link>
            </li>
            <li>
              <Link href="https://journals.lww.com/ijmr/fulltext/2024/01000/sudden_deaths_among_adults_in_india__some.7.aspx">
                Article 2
              </Link>
            </li>
            <li>
              <Link href="https://journals.lww.com/ijmr/fulltext/2023/11000/determinants_of_sudden_deaths_among_adults_in.9.aspx">
                Article 3
              </Link>
            </li>
          </ul>
        </Alert>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 1 }}>
      <HeadingWithDivider title="Did you know?" icon={FcIdea} sx={{ px: 1 }} />
      <Box sx={{ p: 2 }}>
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
        {!isLoading && error && 'Failed to load.'}
        {!isLoading && !error && (
          <>
            {page === 1 && rendeSuddenDeaths()}
            {page === 2 && renderLigtning()}
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={2}
                size="small"
                page={page}
                onChange={handleChange}
              />
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