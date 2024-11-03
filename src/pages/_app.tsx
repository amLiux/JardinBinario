import { AppProps } from 'next/app';
import { AuthProvider } from '@/apollo/AuthClient';
import '../styles/globals.css';
// import CookieBanner from '@/components/CookieBanner';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import { Ubuntu  as font} from 'next/font/google';

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
  return (
    <AuthProvider>
      <main className={fontConfig.className}>
        {getLayout(<Component {...pageProps} />)}
      </main>
      {/* // TODO this is not working */}
      {/* <CookieBanner /> */}
    </AuthProvider>
  );
}

export default JardinBinario;
