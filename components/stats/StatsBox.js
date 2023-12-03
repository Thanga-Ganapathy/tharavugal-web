import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function StatsBox({ name, count, href }) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        m: 1,
        minWidth: '100px',
        userSelect: 'none',
        cursor: 'pointer',
        border: '2px solid gray',
        borderRadius: '5px',
        p: 1,
      }}
      onClick={() => {
        if (href) {
          router.push(href);
        }
      }}
    >
      <Typography variant="h3">{count}</Typography>
      <Typography
        variant="subtitle1"
        sx={{
          textTransform: 'uppercase',
          color: (t) => t.palette.info.main,
          fontSize: '14px',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
