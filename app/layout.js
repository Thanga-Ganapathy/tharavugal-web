import { Box, CssBaseline, Paper, ThemeProvider, Toolbar } from '@mui/material';

import AppHeader from '@/components/layouts/AppHeader';
import theme from '@/theme';
import UnityBanner from '@/components/banners/Unity';
import Footer from '@/components/layouts/Footer';
import UserAgreement from '@/components/layouts/UserAgreement';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh', // Ensure the layout takes full height
            }}
          >
            <AppHeader />
            <Toolbar variant="dense" />
            <Box
              component="main"
              sx={{
                flex: 1, // Main content takes the remaining space
              }}
            >
              <Paper>
                <UnityBanner />
                {children}
              </Paper>
            </Box>
            <Footer />
            <UserAgreement />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
