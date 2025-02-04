'use client';

import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
  useColorScheme,
} from '@mui/material';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagIcon from '@mui/icons-material/Tag';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { FcCalendar, FcGlobe } from 'react-icons/fc';

import EventIcon from '@mui/icons-material/Event';
import LanguageIcon from '@mui/icons-material/Language';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

const DynamicReactJson = dynamic(() => import('@microlink/react-json-view'), {
  ssr: false,
});

import { useRouter } from 'next/navigation';
import { isEmpty } from '@opentf/std';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import Link from '@/components/Link';
import { TZDate } from '@date-fns/tz';
import { useState } from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EventDetails({ event }) {
  const router = useRouter();
  const { mode } = useColorScheme();
  const [tab, setTab] = useState(0);

  const handleExplore = (name, val) => {
    router.push(`/events/search?${name}=${val}`);
  };

  const handleTabChange = (_e, newValue) => {
    setTab(newValue);
  };

  const renderLocationChips = (locations) => {
    return locations.map((loc) => {
      const locs = [loc, ...loc.parentLocations];
      return (
        <Box sx={{ mt: 2 }}>
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
        </Box>
      );
    });
  };

  const renderLocations = (locations) => {
    return (
      <Card variant="outlined" sx={{ m: 1 }}>
        <CardContent>
          <HeadingWithDivider
            title="Location"
            icon={FcGlobe}
            iconSX={{ height: '25px' }}
          />
          {renderLocationChips(locations)}
        </CardContent>
      </Card>
    );
  };

  const renderUpdtedAt = () => {
    return (
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
              event.updatedAt,
              Intl.DateTimeFormat().resolvedOptions().timeZone
            ),
            'yyyy-MM-dd hh:mm:ss aa'
          )}
        </Typography>
      </Box>
    );
  };

  const renderPeriod = () => {
    return (
      <Card variant="outlined" sx={{ m: 1 }}>
        <CardContent>
          <HeadingWithDivider
            title="Period"
            icon={FcCalendar}
            iconSX={{ height: '24px' }}
          />

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
                  new TZDate(event.startedAt, event.startTz),
                  'yyyy-MM-dd'
                )}
              />
              <Chip
                sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                icon={<AccessTimeIcon />}
                color="secondary"
                variant="outlined"
                label={format(
                  new TZDate(event.startedAt, event.startTz),
                  'hh:mm:ss aa'
                )}
              />
              <Chip
                sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                icon={<LanguageIcon />}
                color="secondary"
                variant="outlined"
                label={event.startTz}
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
                  new TZDate(event.endedAt, event.endTz),
                  'yyyy-MM-dd'
                )}
              />
              <Chip
                sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                icon={<AccessTimeIcon />}
                color="secondary"
                variant="outlined"
                label={format(
                  new TZDate(event.endedAt, event.endTz),
                  'hh:mm:ss aa'
                )}
              />
              <Chip
                sx={{ mb: 1, ml: 2, fontWeight: 'bold' }}
                icon={<LanguageIcon />}
                color="secondary"
                variant="outlined"
                label={event.endTz}
                size="small"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderReferences = () => {
    return (
      <Box mt={2}>
        <HeadingWithDivider title="References" />
        <Box sx={{ mt: 2, p: 2, overflowWrap: 'break-word' }}>
          {(event.data?.references || []).map((r, i) => (
            <Link key={i} href={r}>
              {r}
            </Link>
          ))}
          {isEmpty(event.data?.references || []) && (
            <Alert severity="info">No data</Alert>
          )}
        </Box>
      </Box>
    );
  };

  const renderData = () => {
    return (
      <>
        <HeadingWithDivider title="Event Data" />
        <Box sx={{ mt: 2, p: 2 }}>
          <DynamicReactJson
            name={false}
            theme={mode === 'dark' ? 'google' : 'rjv-default'}
            collapsed={false}
            iconStyle="square"
            displayObjectSize={false}
            displayDataTypes={false}
            src={event.data?.public || {}}
          />
        </Box>
      </>
    );
  };

  const renderLinkedEvents = () => {
    return (
      <>
        <HeadingWithDivider title="Linked Events" />
        <Divider />
        <Box sx={{ mt: 2, p: 2, overflowWrap: 'break-word' }}>
          {(event.data?.linkedEvents || []).map((r, i) => (
            <Link key={i} href={r}>
              {r}
            </Link>
          ))}
          {isEmpty(event.data?.linkedEvents || []) && (
            <Alert severity="info">No data</Alert>
          )}
        </Box>
      </>
    );
  };

  const renderVerifiction = () => {
    return (
      <Card variant="outlined" sx={{ m: 1 }}>
        <CardContent>
          <HeadingWithDivider
            title="Data Integrity"
            icon={VerifiedUserIcon}
            iconSX={{ height: '24px' }}
          />
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
              {event.verified ? (
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
            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ width: 24, height: 24 }} />{' '}
              <Typography sx={{ ml: 1 }}>Admin</Typography>
            </Box>
            <Box>Published By:</Box>
            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ width: 24, height: 24 }} />{' '}
              <Typography sx={{ ml: 1 }}>Admin</Typography>
            </Box>
            <Box>Verified:</Box>
            <Box>{0} Persons</Box>
            <Box>Validated:</Box>
            <Box>{0} Persons</Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderCategories = () => {
    return (
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <HeadingWithDivider
            title="Tags"
            icon={TagIcon}
            iconSX={{ height: '24px' }}
          />
          <Box sx={{ mt: 2 }}>
            {event.categories.map((c) => (
              <Chip
                variant="outlined"
                color="default"
                key={c.id}
                label={c.name}
                sx={{ mt: { xs: 1 }, mr: 1 }}
                size="small"
                onClick={() => handleExplore('tag', c)}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Box>
        <Paper sx={{ mt: 2, p: { xs: 1, sm: 1, md: 2 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {event.title}
          </Typography>
          <Divider sx={{ borderBottomWidth: 2 }} />

          {renderUpdtedAt()}

          <Box>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              aria-label="basic tabs"
              centered
            >
              <Tab label="Info" {...a11yProps(0)} />
              <Tab label="Media" {...a11yProps(1)} />
              <Tab label="Data" {...a11yProps(2)} />
              <Tab label="Refs" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tab} index={0}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                mt: 2,
              }}
            >
              {renderPeriod()}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                mt: 2,
              }}
            >
              {renderLocations(event.locations)}
            </Box>

            {renderVerifiction()}

            {renderCategories()}
          </CustomTabPanel>

          <CustomTabPanel value={tab} index={1}>
            <Alert severity="info">No data.</Alert>
          </CustomTabPanel>

          <CustomTabPanel value={tab} index={2}>
            {renderData()}
          </CustomTabPanel>

          <CustomTabPanel value={tab} index={3}>
            {renderReferences()}
            {renderLinkedEvents()}
          </CustomTabPanel>
        </Paper>
      </Box>
    </>
  );
}
