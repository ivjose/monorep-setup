import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';

import { AuthProvider } from '@contexts/AuthContext';
import { NotifyProvider } from '@contexts/NotifyContext';
import { theme } from '@theme';
import store from '../store';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <AuthProvider>
          <NotifyProvider>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </NotifyProvider>
        </AuthProvider>
      </Provider>
    </React.Fragment>
  );
};

export default MyApp;
