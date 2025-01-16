import { Box, Typography } from '@mui/material';
import Link from '../app/Link';

export default function StatsBox({ name, count = 0, href }) {
  return (
    (<Link href={href || 'javascript:;'} sx={{ textDecoration: 'none' }}>
      <Box
        sx={[{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          m: 1,
          minWidth: '100px',
          userSelect: 'none',
          borderRadius: '5px',
          p: 1,
          border: '1px solid darkgray'
        }, href ? {
          cursor: 'pointer'
        } : {
          cursor: 'initial'
        }, href ? {
          '&:hover': {
            backgroundColor: 'rgba(1, 255, 112, 0.5)'
          }
        } : {
          '&:hover': {
            backgroundColor: 'initial'
          }
        }]}
      >
        <Typography variant="h3" sx={{ color: (t) => t.palette.text.primary }}>
          {count}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textTransform: 'uppercase',
            fontSize: '14px',
            fontWeight: 'bold',
            color: (t) => t.palette.info.main,
          }}
        >
          {name}
        </Typography>
      </Box>
    </Link>)
  );
}
