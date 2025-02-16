import { Box, CssBaseline, ThemeProvider } from '@mui/material';

import AppHeader from '@/components/layouts/AppHeader';
import theme from '@/theme';
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
              <main>{children}</main>
            </Box>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
