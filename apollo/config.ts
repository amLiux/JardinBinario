import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
});

const setAuthorizationInContext = setContext((_, prevContext) => {
	const token = localStorage.getItem('token') || '';

	return {
		...prevContext,
		headers: {
			...prevContext.headers,
			Authorization: `Bearer ${token}`,
		},
	};
});

const handleOnError = onError((error) => {
	console.error(error);
});

const authFlow = setAuthorizationInContext.concat(handleOnError);

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authFlow.concat(httpLink)
});
