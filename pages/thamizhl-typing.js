import Layout from '@/components/layouts/DefaultLayout';
import { Badge, Box, Typography } from '@mui/material';
import { TaInput } from '@opentf/react-ta-input';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Videos() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Layout
      title="தமிழ் தட்டச்சு - Thamizhl Typing"
      meta={{
        desc: 'தமிழ் தட்டச்சு - திரை விசைப்பலகை; Online thamizhl typing tool with on-screen keyboard.',
      }}
    >
      <Box textAlign="center">
        <Badge badgeContent="ALPHA" color="secondary">
          <Typography variant="h5">தமிழ் தட்டச்சு - Thamizhl Typing</Typography>
        </Badge>
      </Box>
      <Box sx={{ width: '100%', p: { xs: 1, sm: 2, md: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '75%' }}>
            <TaInput
              inputRef={inputRef}
              kbd
              style={{ position: 'relative', width: '100%' }}
            >
              <Box
                component="textarea"
                placeholder="இங்கே தட்டச்சு செய்யவும்..."
                ref={inputRef}
                sx={{ width: '100%', p: 1 }}
                rows={10}
              />
            </TaInput>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
