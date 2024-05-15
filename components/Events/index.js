import {
  Paper,
  Typography,
  Divider,
  Box,
  Alert,
  Skeleton,
} from '@mui/material';
import Event from './Event';
import Timeline from '../Timeline';
import TimelineTitle from '../Timeline/TimelineTitle';
import TimelineContent from '../Timeline/TimelineContent';
import { format } from 'date-fns';
import { groupBy } from '@opentf/std';
import { utcToZonedTime } from 'date-fns-tz';
import { Hourglass } from 'react-loader-spinner';

export default function Events({ data, styles, isLoading, error }) {
  const renderEvents = () => {
    const eventsWithDate = data.map((e) => ({
      ...e,
      date: format(utcToZonedTime(e.startedAt, e.startTz), 'yyyy-MM-dd'),
    }));
    const groups = groupBy(eventsWithDate, 'date');
    return Object.keys(groups)
      .sort()
      .reverse()
      .map((g, i) => (
        <div key={i}>
          <TimelineTitle title={g} toolTip={format(new Date(g), 'EEEE')} />
          <TimelineContent>
            {groups[g].map((e, i) => (
              <Event key={i} data={e} />
            ))}
          </TimelineContent>
        </div>
      ));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box ml={1} className={styles.blob + ' ' + styles.green} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Real-Time Events
          </Typography>
        </Box>
        <Box>
          {isLoading && (
            <Hourglass
              visible={true}
              height="25"
              width="25"
              ariaLabel="hourglass-loading"
              colors={['#306cce', '#72a1ed']}
            />
          )}
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'darkgray' }} />
      {error && !isLoading && (
        <Typography sx={{ mt: 2 }} variant="body1">
          ❗ Failed to load
        </Typography>
      )}
      <Box my={2}>
        {isLoading &&
          Array(10)
            .fill(0)
            .map((a, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={100}
                sx={{ mt: 2 }}
              />
            ))}
        {data && <Timeline>{renderEvents()}</Timeline>}
      </Box>
      <Alert severity="warning">
        Due to our current infrastructure limitations, only members can view
        unlimited events.
      </Alert>
    </Paper>
  );
}
