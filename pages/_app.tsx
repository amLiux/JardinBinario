import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { AuthProvider } from '../apollo/auth';
import '../styles/globals.css';

function JardinBinario({ Component, pageProps }: AppProps) {
	return <AuthProvider>
		<Component {...pageProps} />
	</AuthProvider>
};

export default JardinBinario;
