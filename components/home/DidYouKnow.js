import { Box, Typography, Pagination, Alert, Button } from '@mui/material';
import HeadingWithDivider from '../HeadingWithDivider';
import { FcIdea } from 'react-icons/fc';
import useSWRImmutable from 'swr/immutable';
import Link from '../app/Link';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

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
          <Box
            component="span"
            sx={{
              color: (t) => t.palette.error.main,
              fontWeight: 'bold',
              fontSize: '36px',
            }}
          >
            {data.lightning.count.killed}
          </Box>{' '}
          People were Killed and{' '}
          <Box
            component="span"
            sx={{
              color: (t) => t.palette.error.main,
              fontWeight: 'bold',
              fontSize: '36px',
            }}
          >
            {data.lightning.count.injury}
          </Box>{' '}
          others Injured by{' '}
          <Box
            component="span"
            sx={{
              textDecoration: 'underline',
              textDecorationColor: (t) => t.palette.error.main,
            }}
          >
            Lightning Strikes
          </Box>
          .
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
          😱 This Year,{' '}
          <Box
            component="span"
            sx={{
              color: (t) => t.palette.error.main,
              fontWeight: 'bold',
              fontSize: '36px',
            }}
          >
            {data.suddenDeaths.count}
          </Box>{' '}
          <Box
            component="span"
            sx={{
              textDecoration: 'underline',
              textDecorationColor: (t) => t.palette.error.main,
            }}
          >
            Sudden Death
          </Box>{' '}
          Case among People under the Age of{' '}
          <Box
            component="span"
            sx={{ color: (t) => t.palette.primary.main, fontSize: '36px' }}
          >
            45
          </Box>{' '}
          in the 🇮🇳 Republic of India.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Link href="/events/search?tag=Sudden&tag=Death">
            <Button
              variant="outlined"
              color="error"
              size="small"
              // sx={{ textTransform: 'inherit' }}
            >
              View All Cases
            </Button>
          </Link>
        </Box>

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

  const renderSuicideCases = () => {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            wordBreak: 'break-word',
          }}
        >
          😟 This Year,{' '}
          <Box
            component="span"
            sx={{
              color: (t) => t.palette.error.main,
              fontWeight: 'bold',
              fontSize: '36px',
            }}
          >
            {data.suicideCases.count}
          </Box>{' '}
          People Committed{' '}
          <Box
            component="span"
            sx={{
              textDecoration: 'underline',
              textDecorationColor: (t) => t.palette.error.main,
            }}
          >
            Suicide
          </Box>
          .
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <table>
            <tr>
              <td align="right">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MaleIcon sx={{ mr: 1 }} />
                  <Typography sx={{ color: (t) => t.palette.info.main }}>
                    Male:
                  </Typography>
                </Box>
              </td>
              <td>
                <Typography
                  sx={{
                    ml: 1,
                    color: (t) => t.palette.error.main,
                    fontWeight: 'bold',
                  }}
                >
                  {data.suicideCases.male}
                </Typography>
              </td>
            </tr>
            <tr>
              <td align="right">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FemaleIcon sx={{ mr: 1 }} />
                  <Typography sx={{ color: (t) => t.palette.info.main }}>
                    Female:
                  </Typography>
                </Box>
              </td>
              <td>
                <Typography
                  sx={{
                    ml: 1,
                    color: (t) => t.palette.error.main,
                    fontWeight: 'bold',
                  }}
                >
                  {data.suicideCases.female}
                </Typography>
              </td>
            </tr>
          </table>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Link href="/events/search?tag=Suicide">
            <Button variant="outlined" color="error" size="small">
              View All Cases
            </Button>
          </Link>
        </Box>

        <Alert severity="info" sx={{ mt: 2 }}>
          Related Articles:
          <ul>
            <li>
              <Link href="https://www.cdc.gov/suicide/prevention/index.html">
                Preventing Suicide
              </Link>
            </li>
            <li>
              <Link href="https://www.nimh.nih.gov/health/topics/suicide-prevention">
                National Institute of Mental Health
              </Link>
            </li>
            <li>
              <Link href="https://www.who.int/publications/i/item/9789241564779">
                Preventing suicide: A global imperative (WHO Book)
              </Link>
            </li>
          </ul>
        </Alert>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 1 }}>
      <HeadingWithDivider title="Did You Know?" icon={FcIdea} sx={{ px: 1 }} />
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
            {page === 2 && renderSuicideCases()}
            {page === 3 && renderLigtning()}
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={3}
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
