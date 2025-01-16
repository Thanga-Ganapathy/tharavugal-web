import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import LanguageIcon from '@mui/icons-material/Language';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

const DynamicReactJson = dynamic(() => import('@microlink/react-json-view'), {
  ssr: false,
});

import Layout from '@/components/layouts/DefaultLayout';
import { getDB } from '@/lib/db';
import { useRouter } from 'next/router';
import { isEmpty } from '@opentf/std';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import Link from '@/components/Link';
import { TZDate } from '@date-fns/tz';

export default function EventView({ data }) {
  const router = useRouter();

  const handleExplore = (name, val) => {
    router.push(`/events/search?${name}=${val}`);
  };

  const renderLocations = (locations) =>
    locations.map((loc) => {
      const locs = [loc, ...loc.parentLocations];
      return (
        <Box key={loc.id} sx={{ display: 'block', mt: 1 }}>
          {locs.map((l) => (
            <Chip
              color="info"
              variant="outlined"
              key={l.id}
              label={l.name}
              sx={{
                mr: 1,
                height: 'auto',
                '& .MuiChip-label': {
                  display: 'block',
                  whiteSpace: 'normal',
                },
              }}
              size="small"
              onClick={() => handleExplore('location', l.id)}
            />
          ))}
        </Box>
      );
    });

  return (
    <Layout
      title={data.event?.title}
      meta={{ urlPath: 'events/' + data.event?.slug }}
    >
      {data.event && (
        <Box>
          <Paper sx={{ mt: 2, p: { xs: 1, sm: 1, md: 2 } }}>
            <Typography variant="h4">{data.event.title}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  bgcolor: 'gold',
                  color: 'black',
                  px: 1,
                  borderRadius: '15px',
                  fontSize: '11px',
                }}
              >
                Updated At:{' '}
                {format(
                  new TZDate(
                    data.event.updatedAt,
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  ),
                  'yyyy-MM-dd hh:mm:ss aa'
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                mt: 2,
              }}
            >
              <Card variant="outlined" sx={{ m: 1 }}>
                <CardContent>
                  <HeadingWithDivider title="Period" />

                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >
                    <Box sx={{ minWidth: '50px' }}>Start:</Box>
                    <Box>
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<EventIcon />}
                        color="secondary"
                        variant="outlined"
                        label={format(
                          new TZDate(data.event.startedAt, data.event.startTz),
                          'yyyy-MM-dd'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<AccessTimeIcon />}
                        color="secondary"
                        variant="outlined"
                        label={format(
                          new TZDate(data.event.startedAt, data.event.startTz),
                          'hh:mm:ss aa'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<LanguageIcon />}
                        color="secondary"
                        variant="outlined"
                        label={data.event.startTz}
                        size="small"
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ minWidth: '50px' }}>End:</Box>
                    <Box>
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<EventIcon />}
                        color="secondary"
                        variant="outlined"
                        label={format(
                          new TZDate(data.event.endedAt, data.event.endTz),
                          'yyyy-MM-dd'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<AccessTimeIcon />}
                        color="secondary"
                        variant="outlined"
                        label={format(
                          new TZDate(data.event.endedAt, data.event.endTz),
                          'hh:mm:ss aa'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<LanguageIcon />}
                        color="secondary"
                        variant="outlined"
                        label={data.event.endTz}
                        size="small"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                mt: 2,
              }}
            >
              <Card variant="outlined" sx={{ m: 1 }}>
                <CardContent>
                  <HeadingWithDivider title="Location" />
                  <Box sx={{ mt: 2 }}>
                    {renderLocations(data.event.locations)}
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}></Box>
            <Box sx={{ display: 'flex', my: 2, flexWrap: 'wrap' }}></Box>
            <Box mt={2}>
              <HeadingWithDivider title="Data" />
              <Box sx={{ mt: 2, p: 2 }}>
                <DynamicReactJson
                  name={false}
                  theme="google"
                  collapsed={false}
                  iconStyle="square"
                  displayObjectSize={false}
                  displayDataTypes={false}
                  src={data.event.data?.public || {}}
                />
              </Box>
            </Box>

            <Box mt={2}>
              <HeadingWithDivider title="References" />
              <Box sx={{ mt: 2, p: 2, overflowWrap: 'break-word' }}>
                {(data.event.data?.references || []).map((r, i) => (
                  <Link key={i} href={r}>
                    {r}
                  </Link>
                ))}
                {isEmpty(data.event.data?.references || []) && (
                  <Alert severity="info">No data</Alert>
                )}
              </Box>
            </Box>

            <Box mt={2}>
              <HeadingWithDivider title="Linked Events" />
              <Divider />
              <Box sx={{ mt: 2, p: 2, overflowWrap: 'break-word' }}>
                {(data.event.data?.linkedEvents || []).map((r, i) => (
                  <Link key={i} href={r}>
                    {r}
                  </Link>
                ))}
                {isEmpty(data.event.data?.linkedEvents || []) && (
                  <Alert severity="info">No data</Alert>
                )}
              </Box>
            </Box>

            <Box mt={2}>
              <HeadingWithDivider title="Event Entities" />
              <Divider />
              <Box sx={{ mt: 2, p: 2 }}>
                <Alert severity="info">No data</Alert>
              </Box>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
              <Card variant="outlined" sx={{ m: 1 }}>
                <CardContent>
                  <HeadingWithDivider title="Verification / Validation" />
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gridGap: '15px 10px',
                      mt: 2,
                    }}
                  >
                    <Box>Status:</Box>
                    <Box>
                      {data.event.verified ? (
                        <Chip
                          icon={<CheckCircleOutlinedIcon />}
                          label="Verified"
                          color="success"
                          size="small"
                        />
                      ) : (
                        <Chip
                          icon={<CancelOutlinedIcon />}
                          label="Not Verified"
                          color="error"
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                    <Box>Drafted By:</Box>
                    <Box>Admin</Box>
                    <Box>Published By:</Box>
                    <Box>Admin</Box>
                    <Box>Cross-checked By:</Box>
                    <Box>None</Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
              <Card variant="outlined" sx={{ m: 1 }}>
                <CardContent>
                  <HeadingWithDivider title="Tags" />
                  <Box sx={{ mt: 2 }}>
                    {data.event.categories.map((c, i) => (
                      <Chip
                        variant="outlined"
                        color="default"
                        key={i}
                        label={c}
                        sx={{ mt: { xs: 1 }, mr: 1 }}
                        size="small"
                        onClick={() => handleExplore('tag', c)}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Box>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    // Get the base URL (handle production vs development environments)
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${req.headers.host}`; // for production

    const url = `${baseUrl}/api/events/${context.query.slug}`;
    console.log('url', url);

    // // Call the API
    // const res = await fetch(url);

    // // Handle non-OK responses
    // if (!res.ok) {
    //   throw new Error('Failed to fetch data');
    // }

    // // Parse the response body
    // const data = await res.json();

    // Pass data to the page component as props
    return {
      props: {
        data: {}, // The data from the API response
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'Failed to fetch data',
      },
    };
  }
}
