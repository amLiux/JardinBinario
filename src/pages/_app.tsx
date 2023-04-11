import { AppProps } from 'next/app';
import { AuthProvider } from '@/apollo/AuthClient';
import '../styles/globals.css';
import { Transition } from '@/components/Transition';
import CookieBanner from '@/components/CookieBanner';

function JardinBinario({ Component, pageProps }: AppProps) {

	return <AuthProvider>
		<Transition>
			<Component {...pageProps} />
			<CookieBanner />
		</Transition>
	</AuthProvider>;
};

export default JardinBinario;
