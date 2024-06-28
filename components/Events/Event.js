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
import { utcToZonedTime } from 'date-fns-tz';
import Link from '../app/Link';
import ImageIcon from '@mui/icons-material/Image';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AnchorIcon from '@mui/icons-material/Anchor';
import LinkIcon from '@mui/icons-material/Link';

export default function Event({ data }) {
  const router = useRouter();

  const handleExplore = (name, val) => {
    router.push(`/events/search?${name}=${val}`);
  };

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardHeader
        action={<ActionMenu />}
        title={<Link href={'/events/' + data.slug}>{data.title}</Link>}
      />
      <CardContent>
        <Box>
          {data.locations.map((l, i) => (
            <Chip
              color="info"
              variant="outlined"
              key={i}
              label={l}
              sx={{
                mt: { xs: 1 },
                mr: 1,
                height: 'auto',
                '& .MuiChip-label': {
                  display: 'block',
                  whiteSpace: 'normal',
                },
              }}
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

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Tooltip sx={{ mr: 2 }} title="Images (0)">
              <ImageIcon fontSize="small" color="disabled" />
            </Tooltip>
            <Tooltip sx={{ mr: 2 }} title="Videos (0)">
              <PlayCircleFilledIcon fontSize="small" color="disabled" />
            </Tooltip>
            <Tooltip sx={{ mr: 2 }} title="References (0)">
              <AnchorIcon fontSize="small" color="disabled" />
            </Tooltip>
            <Tooltip sx={{ mr: 2 }} title="Links (0)">
              <LinkIcon fontSize="small" color="disabled" />
            </Tooltip>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="span" fontSize={12} color="text.secondary">
              {format(
                utcToZonedTime(data.startedAt, data.startTz),
                'yyyy-MM-dd hh:mm:ss aa'
              )}{' '}
              {data.startTz}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
