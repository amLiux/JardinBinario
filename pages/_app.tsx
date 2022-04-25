import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { client } from '../apollo/config';
import '../styles/globals.css';

function JardinBinario({ Component, pageProps }: AppProps) {
	return <ApolloProvider client={client}>
		<Component {...pageProps} />
	</ApolloProvider>
};

export default JardinBinario;
