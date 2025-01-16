import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Tooltip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import ActionMenu from './ActionMenu';
import { useRouter } from 'next/router';
import { TZDate } from '@date-fns/tz';
import Link from '../Link';
import ImageIcon from '@mui/icons-material/Image';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AnchorIcon from '@mui/icons-material/Anchor';
import LinkIcon from '@mui/icons-material/Link';

const InfoTooltip = ({ title, Icon }) => (
  <Tooltip sx={{ mr: 2 }} title={title}>
    <Icon fontSize="small" color="disabled" />
  </Tooltip>
);

const Event = ({ data }) => {
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
  
  const renderCategories = (categories) =>
    categories.map((c) => (
      <Chip
        variant="outlined"
        color="default"
        key={c.id}
        label={c.name}
        sx={{ mt: { xs: 1 }, mr: 1 }}
        size="small"
        onClick={() => handleExplore('tag', c.id)}
      />
    ));

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardHeader
        action={<ActionMenu />}
        title={<Link href={`/events/${data.slug}`}>{data.title}</Link>}
      />
      <CardContent>
        <Box>{renderLocations(data.locations)}</Box>
        {data.categories && (
          <Box sx={{ mt: 2 }}>{renderCategories(data.categories)}</Box>
        )}

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <InfoTooltip title="Images (0)" Icon={ImageIcon} />
            <InfoTooltip title="Videos (0)" Icon={PlayCircleFilledIcon} />
            <InfoTooltip title="References (0)" Icon={AnchorIcon} />
            <InfoTooltip title="Links (0)" Icon={LinkIcon} />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="span" fontSize={12} color="text.secondary">
              {format(new TZDate(data.startedAt, data.startTz), 'yyyy-MM-dd hh:mm:ss aa')}{' '}
              {data.startTz}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Event;
