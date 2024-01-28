import { AppProps } from 'next/app';
import { AuthProvider } from '@/apollo/AuthClient';
import '../styles/globals.css';
import { Transition } from '@/components/Transition';
import CookieBanner from '@/components/CookieBanner';

function JardinBinario({ Component, pageProps, router }: AppProps) {

	const isReadPage = router.pathname.startsWith('/read');


	return <AuthProvider>
		<>
			{!isReadPage ? (
				<Transition>
					<Component {...pageProps} />
					<CookieBanner />
				</Transition>
			) :
				<>
					<Component {...pageProps} />
					<CookieBanner />
				</>
			}
		</>
	</AuthProvider>;
};

export default JardinBinario;
