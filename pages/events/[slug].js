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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import LanguageIcon from '@mui/icons-material/Language';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

const DynamicReactJson = dynamic(() => import('@microlink/react-json-view'), {
  ssr: false,
});

import Layout from '@/components/layouts/DefaultLayout';
import { utcToZonedTime } from 'date-fns-tz';
import { connect } from '@/utils/db';
import { useRouter } from 'next/router';

export default function EventView({ data }) {
  const router = useRouter();

  const handleExplore = (name, val) => {
    router.push(`/explore?${name}=${val}`);
  };

  return (
    <Layout
      title={data.event?.title}
      meta={{ urlPath: 'events/' + data.event?.slug }}
    >
      {data.event && (
        <Box>
          <Paper sx={{ mt: 2, p: { xs: 1, sm: 1, md: 2 } }}>
            <Typography variant="h3">{data.event.title}</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: 'text.secondary', textAlign: 'right' }}
            >
              Updated At: {data.event.updatedAt}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
              <Card variant="outlined" sx={{ m: 1 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ textDecoration: 'underline', mb: 1 }}
                  >
                    PERIOD
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ minWidth: '50px' }}>Start:</Box>
                    <Box>
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<EventIcon />}
                        color="primary"
                        label={format(
                          utcToZonedTime(
                            data.event.startedAt,
                            data.event.startTz
                          ),
                          'yyyy-MM-dd'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<AccessTimeIcon />}
                        color="primary"
                        label={format(
                          utcToZonedTime(
                            data.event.startedAt,
                            data.event.startTz
                          ),
                          'hh:mm:ss aa'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<LanguageIcon />}
                        color="primary"
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
                        color="primary"
                        label={format(
                          utcToZonedTime(data.event.endedAt, data.event.endTz),
                          'yyyy-MM-dd'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<AccessTimeIcon />}
                        color="primary"
                        label={format(
                          utcToZonedTime(data.event.endedAt, data.event.endTz),
                          'hh:mm:ss aa'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<LanguageIcon />}
                        color="primary"
                        label={data.event.endTz}
                        size="small"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card variant="outlined" sx={{ m: 1 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ textDecoration: 'underline', mb: 1 }}
                  >
                    GEO
                  </Typography>
                  {data.event.locations.map((l, i) => (
                    <Chip
                      color="info"
                      variant="outlined"
                      key={i}
                      label={l}
                      sx={{ mt: { xs: 1 }, mr: 1 }}
                      size="small"
                      onClick={() => handleExplore('location', l)}
                    />
                  ))}
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Card variant="outlined" sx={{ m: 1 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ textDecoration: 'underline', mb: 1 }}
                  >
                    VERIFICATION / VALIDATION
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gridGap: '15px 10px',
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
                        />
                      )}
                    </Box>
                    <Box>Drafted By:</Box>
                    <Box>Admin (Roles: Admin, Core Member)</Box>
                    <Box>Published By:</Box>
                    <Box>Admin (Roles: Admin, Core Member)</Box>
                    <Box>Cross-checked By:</Box>
                    <Box>None</Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ display: 'flex', my: 2, flexWrap: 'wrap' }}>
              <Card variant="outlined" sx={{ m: 1 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ textDecoration: 'underline', mb: 1 }}
                  >
                    TAGS
                  </Typography>
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
                </CardContent>
              </Card>
            </Box>
            <Box mt={2}>
              <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ChevronRightIcon /> Data
              </Typography>
              <Divider />
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
            <Box mt={2}>
              <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ChevronRightIcon /> Linked Events
              </Typography>
              <Divider />
              <Alert severity="info">No data</Alert>
            </Box>
            <Box mt={2}>
              <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ChevronRightIcon /> Event Entities
              </Typography>
              <Divider />
              <Alert severity="info">No data</Alert>
            </Box>
          </Paper>
        </Box>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const db = await connect();
  const coll = db.collection('events');
  const event = await coll.findOne(
    { slug: context.query.slug },
    { projection: { _id: 0 } }
  );

  if (event === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: { event: JSON.parse(JSON.stringify(event)) },
    },
  };
}
