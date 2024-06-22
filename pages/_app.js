import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useRouter } from 'next/router';
import { setAppState, useAppState } from '@/store';
import { SWRConfig } from 'swr';
import APIClient from '@/utils/APIClient';
import { useMemo } from 'react';
import { isStr } from '@opentf/std';
import Loading from '@/components/app/Loading';
import Head from 'next/head';
import { META_INFO } from '@/constants';

const getDesignTokens = (mode) => ({
  components: {
    MuiTooltip: {
      styleOverrides: {
        // Name of the slot
        tooltip: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.info.light
              : theme.palette.info.dark,
          fontSize: '14px',
          color: 'white',
        }),
      },
    },
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          background: {
            default: '#E7EBF0',
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: '#000000',
          },
        }),
  },
});

function matchRoute(path, arr) {
  return arr.find((p) => {
    const arr = path.match(p);
    if (arr && arr[0] === path) return true;
  });
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const themeMode = useAppState((s) => s.themeMode);
  // Update the theme only if the mode changes
  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
  );

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (user) {
      setAppState((s) => ({ ...s, user }));
    }

    function authCheck(url) {
      // redirect to login page if accessing a private page and not logged in
      const publicPaths = [
        '/',
        '/signin',
        '/visualizer',
        '/work-pipeline',
        '/thamizhl-dictionary',
        '/events/search',
        '/research',
        '/thirukkural',
        '/thirukkural/chapters/.+',
        '/on-this-day',
        '/thamizhl-calendar',
        '/open-discussions',
        '/translations',
        '/archival-records',
        '/images',
        '/videos',
        '/documents',
        '/books',
        '/contributing-process',
        '/entities',
        '/literatures',
        '/statistics',
        '/statistics/tags',
        '/statistics/locations',
        '/events/.+',
        '/contribution-logs',
        '/kb',
        '/contact-us',
        '/about-us',
        '/faqs',
        '/terms-conditions',
        '/privacy-policy',
        '/contribute',
        '/open-issues',
        '/food-ingredients',
        '/food-ingredients/.+',
        '/aathichoodi',
        '/resources/.+',
        '/credits',
        '/thamizhl-typing',
        '/global-maps',
        '/donation',
        '/reports/republic-of-india-general-election-parliamentary-constituencies-2024',
      ];
      const path = url.split('?')[0];
      const user = window.localStorage.getItem('user');
      if (!user && !matchRoute(path, publicPaths)) {
        setAuthorized(false);
        router.push('/signin');
      } else {
        setAuthorized(true);
      }
    }
    // run auth check on initial load
    authCheck(window.location.pathname);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  // For theme mode
  useEffect(() => {
    const local = window.localStorage.getItem('themeMode');
    const currentMode = isStr(local)
      ? local === 'dark'
        ? 'dark'
        : 'light'
      : 'light';
    setAppState((s) => ({ themeMode: currentMode }));
  }, []);

  return (
    <>
      <Head>
        <meta key="__meta_title" name="title" content={META_INFO.title} />
        <meta key="__meta_desc" name="description" content={META_INFO.desc} />
        <meta
          key="__meta_og_title"
          property="og:title"
          content={META_INFO.title}
        />
        <meta property="og:type" content="website" />
        <meta
          key="__meta_og_desc"
          property="og:description"
          content={META_INFO.desc}
        />
        <meta key="__meta_og_img" property="og:image" content="" />
        <meta key="__meta_og_url" property="og:url" content={META_INFO.url} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SnackbarProvider maxSnack={3}>
              <SWRConfig
                value={{
                  fetcher: APIClient.get,
                  onError(err, key, config) {
                    console.log(err);
                    console.log(err.status);
                    console.log(key);
                    console.log(config);
                  },
                }}
              >
                {authorized ? <Component {...pageProps} /> : <Loading />}
              </SWRConfig>
            </SnackbarProvider>
          </LocalizationProvider>
        </main>
        <style global jsx>
          {`
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > main {
              height: 100%;
            }
          `}
        </style>
      </ThemeProvider>
    </>
  );
}
