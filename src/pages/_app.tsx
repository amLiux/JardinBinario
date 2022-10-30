import { AppProps } from 'next/app';
import { AuthProvider } from '../apollo/AuthClient';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { LoadingSplash } from '../components/LoadingSplash';

type LoadingProps = {
	children: ReactNode | ReactNode[];
};

function Loading({ children }: LoadingProps) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
		const handleComplete = (url: string) => (url === router.asPath) && setTimeout(() => setLoading(false), 3000);
		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeStart', handleComplete);
		router.events.on('routeChangeComplete', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeStart', handleComplete);
			router.events.off('routeChangeComplete', handleComplete);
		};
	});

	return loading ? <LoadingSplash /> : <>{children}</>;
};

function JardinBinario({ Component, pageProps }: AppProps) {
	return <AuthProvider>
		<Loading>
			<Component {...pageProps} />
		</Loading>
	</AuthProvider>;
};

export default JardinBinario;
