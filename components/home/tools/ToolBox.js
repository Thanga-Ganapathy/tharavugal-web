import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function ToolBox({ icon: Icon, label, path, active }) {
  const router = useRouter();

  return (
    <Box
      onClick={() => router.push(path)}
      sx={{
        width: '120px',
        minHeight: '100px',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: active ? '2px dashed #01FF70' : '2px dashed gray',
        cursor: 'pointer',
        textTransform: 'uppercase',
        m: 1,
        p: 1,
        '&:hover': {
          backgroundColor: 'rgba(1, 255, 112, 0.5)',
        },
      }}
    >
      <Box
        component={Icon}
        sx={{ width: '50px', height: '50px', mt: '10px' }}
      />
      <Typography
        textAlign="center"
        mt={1}
        variant="body1"
        sx={{ userSelect: 'none' }}
        fontSize={14}
      >
        {label}
      </Typography>
    </Box>
  );
}
