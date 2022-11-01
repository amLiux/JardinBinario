import { AppProps } from 'next/app';
import { AuthProvider } from '@/apollo/AuthClient';
import '../styles/globals.css';
import { Transition } from '@/components/Transition';

function JardinBinario({ Component, pageProps }: AppProps) {

	return <AuthProvider>
		<Transition>
			<Component {...pageProps} />
		</Transition>
	</AuthProvider>;
};

export default JardinBinario;
