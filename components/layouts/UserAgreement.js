import { Box, Button, Typography } from '@mui/material';
import Link from '../app/Link';
import { useState } from 'react';

export default function UserAgreement() {
  const [agreement, setAgreement] = useState(localStorage.getItem('agreement'));

  if (agreement === null) {
    return (
      <Box
        sx={{
          position: 'fixed',
          left: { md: '50%' },
          transform: { md: 'translateX(-50%)' },
          m: { xs: 2, sm: 2, md: 0 },
          bottom: '15px',
          borderRadius: '8px',
          zIndex: 1000,
          background: '#85144b',
          p: 2,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">
            Welcome to Tharavugal, A Non-Profit Data Platform.
          </Typography>
        </Box>

        <Typography variant="h6">
          Please read our{' '}
          <Link
            sx={{ color: 'white', textDecorationColor: 'white' }}
            underline="always"
            href="/terms-conditions"
          >
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link
            sx={{ color: 'white', textDecorationColor: 'white' }}
            href="/privacy-policy"
            underline="always"
          >
            Privacy Policy
          </Link>{' '}
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 1, background: 'white', color: 'black' }}
          onClick={() => {
            localStorage.setItem('agreement', true);
            setAgreement(true);
          }}
        >
          ✔️ Accept
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 1, background: 'white', color: 'black', ml: 2 }}
          onClick={() => {
            localStorage.setItem('agreement', false);
            setAgreement(true);
          }}
        >
          ❌ Dismiss
        </Button>
      </Box>
    );
  }
}
