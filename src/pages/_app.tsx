import { AppProps } from 'next/app';
import { AuthProvider } from '@/apollo/AuthClient';
import '../styles/globals.css';
import CookieBanner from '@/components/CookieBanner';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function JardinBinario({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
      {/* // TODO this is not working */}
      {/* <CookieBanner /> */}
    </AuthProvider>
  );
}

export default JardinBinario;
