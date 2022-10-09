import { AppProps } from 'next/app';
import { AuthProvider } from '../apollo/AuthClient';
import '../styles/globals.css';

function JardinBinario({ Component, pageProps }: AppProps) {
	return <AuthProvider>
		<Component {...pageProps} />
	</AuthProvider>;
};

export default JardinBinario;
