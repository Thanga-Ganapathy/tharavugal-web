import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import ActionMenu from './ActionMenu';
import { useRouter } from 'next/router';
import { utcToZonedTime } from 'date-fns-tz';

export default function Event({ data }) {
  const router = useRouter();

  const handleExplore = (name, val) => {
    router.push(`/events/search?${name}=${val}`);
  };

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardHeader
        action={<ActionMenu />}
        title={
          <Typography component="a" fontSize={18} href={'/events/' + data.slug}>
            {data.title}
          </Typography>
        }
      />
      <CardContent>
        <Box>
          {data.locations.map((l, i) => (
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
        </Box>
        {data.categories && (
          <Box sx={{ mt: 2 }}>
            {data.categories.map((c, i) => (
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
        )}
        <Box mt={1} sx={{ textAlign: 'right' }}>
          <Typography variant="span" fontSize={12} color="text.secondary">
            {format(
              utcToZonedTime(data.startedAt, data.startTz),
              'yyyy-MM-dd hh:mm:ss aa'
            )}{' '}
            {data.startTz}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
