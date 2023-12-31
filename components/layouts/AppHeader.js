import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAppState } from '@/store';
import { USER_ROLES } from '@/constants';
import styles from '../../pages/index.module.css';
import AppDrawer from './AppDrawer';

function logout() {
  window.sessionStorage.clear();
  localStorage.removeItem('user');
  window.location = '/';
}

export default function AppHeader() {
  const router = useRouter();
  const user = useAppState((s) => s.user);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar
        variant="dense"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <AppDrawer />
          <Typography
            variant="h6"
            noWrap
            sx={{ fontWeight: 'bold', cursor: 'pointer', letterSpacing: '3px' }}
            onClick={() => router.push('/')}
          >
            தரவுகள்
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user && user.role === USER_ROLES.ADMIN && (
            <Box mr={2} component={Link} href="/admin">
              Dashboard
            </Box>
          )}
          {user && (
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={() => logout()}
            >
              Sign Out
            </Button>
          )}
          {!user && (
            <Box
              component={Link}
              href="/contribute"
              sx={{
                alignItems: 'center',
                border: 'none',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'row',
                padding: '0 10px',
                textDecoration: 'none',
                color: 'white',
                background: 'black',
                fontWeight: 'bold',
                mx: 1,
                letterSpacing: '1px',
                fontSize: '15px',
              }}
            >
              CONTRIBUTE
              <Box className={styles.heart}>❤️</Box>
            </Box>
          )}
          {!user && (
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              startIcon={<LockIcon />}
              onClick={() => router.push('/signin')}
              sx={{ display: { xs: 'none', sm: 'inherit' } }}
            >
              Sign in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
