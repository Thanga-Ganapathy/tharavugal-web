import { Paper, Typography, Divider, Box, Alert } from '@mui/material';
import Event from './Event';
import Timeline from '../Timeline';
import TimelineTitle from '../Timeline/TimelineTitle';
import TimelineContent from '../Timeline/TimelineContent';
import { format } from 'date-fns';
import { groupBy } from '@opentf/utils';
import { utcToZonedTime } from 'date-fns-tz';

export default function Events({ data, styles }) {
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box ml={1} className={styles.blob + ' ' + styles.green} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Real-Time Events
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box my={2}>
        <Timeline>{renderEvents()}</Timeline>
      </Box>
      <Alert severity="warning">
        Currently, only members can view unlimited events.
      </Alert>
    </Paper>
  );
}
