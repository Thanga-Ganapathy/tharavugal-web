import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Link from '../app/Link';

export default function Ingredient({ data }) {
  return (
    <Card sx={{ maxWidth: '200px', m: 1 }} variant="outlined">
      <CardContent>
        <Typography variant="h6">{data.name}</Typography>
        {data.otherName && (
          <Typography variant="subtitle2">({data.otherName})</Typography>
        )}
        {data.processed && (
          <Box mt={2}>
            Processed:
            {data.processed.map((p, i) => (
              <Chip
                key={i}
                label={p}
                size="small"
                sx={{ m: 1 }}
                color="secondary"
              />
            ))}
          </Box>
        )}
        {data.insNo && (
          <Box mt={2}>
            <span>
              INS No:{' '}
              <Link href={data.gsfaUrl}>
                {data.insNo} <OpenInNewOutlinedIcon sx={{ fontSize: '12px' }} />
              </Link>
            </span>
          </Box>
        )}
        {data.data?.source && (
          <Box mt={2}>
            <span>Source: {data.data.source}</span>
          </Box>
        )}
        {data.groups && (
          <Box mt={2}>
            Groups:
            {data.groups.map((g, i) => (
              <Chip key={i} label={g} size="small" sx={{ m: 1 }} color="info" />
            ))}
          </Box>
        )}
      </CardContent>
      <CardActions>
        {data.data?.organic !== 'Unknown' && (
          <Chip
            variant="outlined"
            size="small"
            label={data.organic ? 'Organic' : 'Inorganic'}
            color={data.organic ? 'success' : 'warning'}
          />
        )}
        {data.additive && (
          <Chip
            variant="outlined"
            size="small"
            label="Additive"
            color="error"
          />
        )}
      </CardActions>
    </Card>
  );
}
