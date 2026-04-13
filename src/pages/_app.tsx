import { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, ReactElement } from 'react';
import { NextPage } from 'next';
import { Ubuntu as font } from 'next/font/google';

import { AuthProvider } from '@/apollo/AuthClient';

import '../styles/globals.css';
// import CookieBanner from '@/components/CookieBanner';


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const fontConfig = font({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function JardinBinario({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const messages = pageProps.messages || {};
  return (
    <AuthProvider>
      {/* for admin screens we do {} as we don't translate */}
      <NextIntlClientProvider locale={pageProps.locale || "en"} messages={messages || {}} >
        <main className={fontConfig.className}>
          {getLayout(<Component {...pageProps} />)}
        </main>
      </NextIntlClientProvider>
      {/* // TODO this is not working */}
      {/* <CookieBanner /> */}
    </AuthProvider>
  );
}

export default JardinBinario;
