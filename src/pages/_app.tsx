import { AppProps } from 'next/app';
import { AuthProvider } from '@/apollo/AuthClient';
import '../styles/globals.css';
import { Transition } from '@/components/Transition';
import CookieBanner from '@/components/CookieBanner';

function JardinBinario({ Component, pageProps, router }: AppProps) {

	const isReadPage = router.pathname.startsWith('/read');


	return <AuthProvider>
		<Transition isReadPage={isReadPage}>
			<Component {...pageProps} />
			<CookieBanner />
		</Transition>
	</AuthProvider>;
};

export default JardinBinario;
