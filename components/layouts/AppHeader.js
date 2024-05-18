import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { setAppState, useAppState } from '@/store';
import { USER_ROLES } from '@/constants';
import styles from '../../pages/index.module.css';
import AppDrawer from './AppDrawer';
import Link from '../app/Link';

function logout() {
  window.sessionStorage.clear();
  localStorage.removeItem('user');
  window.location = '/';
}

export default function AppHeader() {
  const router = useRouter();
  const user = useAppState((s) => s.user);
  const themeMode = useAppState((s) => s.themeMode);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Paper square>
        <Toolbar
          variant="dense"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <AppDrawer />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                letterSpacing: '3px',
              }}
              onClick={() => router.push('/')}
            >
              தரவுகள்
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && user.role === USER_ROLES.ADMIN && (
              <Link mr={2} href="/admin">
                Dashboard
              </Link>
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
              <Link
                href="/contribute"
                sx={{
                  alignItems: 'center',
                  border: 'none',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '0 10px',
                  textDecoration: 'none',
                  color: (t) => (t.palette.mode === 'dark' ? 'black' : 'white'),
                  backgroundColor: (t) =>
                    t.palette.mode === 'dark' ? 'white' : 'black',
                  fontWeight: 'bold',
                  mx: 1,
                  letterSpacing: '1px',
                  fontSize: '14px',
                }}
              >
                CONTRIBUTE
                <Box className={styles.heart}>❤️</Box>
              </Link>
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
            <Tooltip title="Toggle Mode" arrow>
              <IconButton
                sx={{ ml: 1 }}
                color="inherit"
                onClick={() => {
                  const mode = themeMode === 'light' ? 'dark' : 'light';
                  setAppState((s) => ({
                    themeMode: mode,
                  }));
                  localStorage.setItem('themeMode', mode);
                }}
              >
                {themeMode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Paper>
    </AppBar>
  );
}
