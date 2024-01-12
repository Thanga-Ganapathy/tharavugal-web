import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { setAppState, useAppState } from '@/store';
import APIClient from '@/utils/APIClient';
import { utcToZonedTime } from 'date-fns-tz';

export default function EventView() {
  const isLoading = useAppState((s) => s.loading);
  const [state, setState] = useState({
    event: null,
    error: false,
  });
  const router = useRouter();
  const handleExplore = (name, val) => {
    router.push(`/explore?${name}=${val}`);
  };

  useEffect(() => {
    async function fetchData(slug) {
      if (!slug) {
        return;
      }

      setAppState((s) => ({ ...s, loading: true }));

      try {
        const response = await APIClient.get(
          '/api/events/' + router.query.slug
        );
        if (response.data.event) {
          setState({
            event: response.data.event,
            error: false,
          });
        } else {
          setState({
            ...state,
            error: 'The requested event could not be found.',
          });
        }
        setAppState((s) => ({ ...s, loading: false }));
      } catch (error) {
        setState({ error: error.message });
        setAppState((s) => ({ ...s, loading: false }));
      }
    }
    fetchData(router.query.slug);
  }, [router.query]);

  if (state.error) {
    return (
      <Layout>
        <Alert severity="error">{state.error}</Alert>
      </Layout>
    );
  }

  return (
    <Layout title={state.event?.title}>
      {state.event && (
        <Box>
          <Paper sx={{ mt: 2, p: { xs: 1, sm: 1, md: 2 } }}>
            <Typography variant="h3">{state.event.title}</Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: 'text.secondary', textAlign: 'right' }}
            >
              Updated At: {state.event.updatedAt}
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
                            state.event.startedAt,
                            state.event.startTz
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
                            state.event.startedAt,
                            state.event.startTz
                          ),
                          'hh:mm:ss aa'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<LanguageIcon />}
                        color="primary"
                        label={state.event.startTz}
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
                          utcToZonedTime(
                            state.event.endedAt,
                            state.event.endTz
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
                            state.event.endedAt,
                            state.event.endTz
                          ),
                          'hh:mm:ss aa'
                        )}
                      />
                      <Chip
                        sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                        icon={<LanguageIcon />}
                        color="primary"
                        label={state.event.endTz}
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
                  {state.event.locations.map((l, i) => (
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
                      {state.event.verified ? (
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
                  {state.event.categories.map((c, i) => (
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
                src={state.event.data?.public || {}}
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
