import Link from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import APIClient from '@/utils/APIClient';
import useAlert from '@/hooks/useAlert';
import Layout from '@/components/layouts/DefaultLayout';
import { setAppState } from '@/store';
import { useRouter } from 'next/router';
import { USER_ROLES } from '@/constants';

export default function Signin() {
  const router = useRouter();
  const showAlert = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const result = await APIClient.post(
        '/api/signin',
        Object.fromEntries(data)
      );
      if (result.ok) {
        setAppState((s) => ({
          ...s,
          user: result.data.user,
        }));
        localStorage.setItem('user', JSON.stringify(result.data.user));
        router.replace(
          result.data.user.role === USER_ROLES.ADMIN ? '/admin' : '/'
        );
      } else {
        showAlert('error', result.data.message);
      }
    } catch (error) {
      showAlert('error', "Server Error");
    }
  };

  return (
    <Layout title="Sign In">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            p: 3,
            marginTop: 8,
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Divider>Or</Divider>
              <Button variant="contained" fullWidth sx={{ mt: 3 }} disabled>
                Create account
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </Layout>
  );
}
