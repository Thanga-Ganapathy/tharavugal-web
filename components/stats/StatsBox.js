import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function StatsBox({ name, count = 0, href }) {
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
        cursor: href ? 'pointer' : 'initial',
        borderRadius: '5px',
        p: 1,
        backgroundColor: '#39CCCC',
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
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
