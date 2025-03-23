import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from '@/theme';
import Providers from '@/components/Providers';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
