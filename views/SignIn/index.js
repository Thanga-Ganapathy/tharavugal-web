'use client';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid2,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import APIClient from '@/utils/APIClient';
import useAlert from '@/hooks/useAlert';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from '@/components/Link';
import { setAppState } from '@/store';
import { USER_ROLES } from '@/constants';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const showAlert = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      const result = await APIClient.post(
        '/api/signin',
        Object.fromEntries(data)
      );

      setAppState((s) => ({
        ...s,
        user: result.data.user,
      }));
      localStorage.setItem('user', JSON.stringify(result.data.user));
      router.replace(
        result.data.user.role === USER_ROLES.ADMIN ? '/admin' : '/'
      );
    } catch (error) {
      console.error(error);
      showAlert('error', error.message);
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box sx={{ maxWidth: '340px' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            loading={loading}
            sx={{ mt: 3, mb: 2 }}
            loadingIndicator="Signing..."
            variant="contained"
            type="submit"
            fullWidth
          >
            Sign In
          </Button>
          <Grid2 container>
            <Grid2 item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid2>
          </Grid2>

          <Box mt={3}>
            <Divider>Or</Divider>
            <Button variant="contained" fullWidth sx={{ mt: 3 }} disabled>
              Create account
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
