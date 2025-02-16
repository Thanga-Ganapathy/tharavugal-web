import { Box, CssBaseline, ThemeProvider } from '@mui/material';

import AppHeader from '@/components/layouts/AppHeader';
import theme from '@/theme';
import Footer from '@/components/layouts/Footer';
import UserAgreement from '@/components/layouts/UserAgreement';
import MainContent from '@/components/layouts/MainContent';
import Providers from '@/components/Providers';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Providers>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Ensure the layout takes full height
              }}
            >
              <AppHeader />

              <MainContent>{children}</MainContent>

              <Footer />
              <UserAgreement />
            </Box>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
