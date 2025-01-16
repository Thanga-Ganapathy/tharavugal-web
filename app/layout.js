import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';

import AppHeader from '@/components/layouts/AppHeader';
import theme from '@/theme';

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
                paddingTop: '50px', // Ensure content starts below the header
                backgroundColor: '#f4f4f4', // Optional background color for main content
                padding: 2, // Responsive padding
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
