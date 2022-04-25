import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { setContext } from '@apollo/client/link/context';
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	gql,
	createHttpLink,
} from '@apollo/client';
import { querys } from '../gql/querys';
import { onError } from '@apollo/client/link/error';
import { Router, useRouter } from 'next/router';

const authContext = createContext({});

type AuthProviderProps = {
	children: ReactNode;
}


type ProtectRouteProps = {
	children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const auth = useProviderAuth();

	return (
		<authContext.Provider value={auth}>
			<ApolloProvider client={auth.createApolloClient()}>
				{children}
			</ApolloProvider>
		</authContext.Provider>
	);
}

export const useAuth = (): any => {
	return useContext(authContext);
}

function useProviderAuth() {
	const [error, setError] = useState<string>('');
	const [cachedToken, setCachedToken] = useState<string>('');

	useEffect(() => {
		const token = localStorage.getItem('token') || '';
		if (token) setCachedToken(token);
	}, []);

	const removeError = (): void => {
		setError('');
	};

	const isSignedIn = (): boolean => {
		if (cachedToken) {
			return true;
		} else {
			return false;
		}
	};

	const createApolloClient = () => {
		const httpLink = createHttpLink({
			uri: 'http://localhost:4000',
		});

		const setAuthorizationInContext = setContext((_, prevContext) => {
			return {
				...prevContext,
				headers: {
					...prevContext.headers,
					Authorization: `Bearer ${cachedToken}`,
				},
			};
		});

		const handleOnError = onError((error: any) => {
			const { graphQLErrors } = error;
			const { message } = graphQLErrors[0];
			setError(message);
		});

		const authFlow = setAuthorizationInContext.concat(handleOnError);

		return new ApolloClient({
			link: authFlow.concat(httpLink),
			cache: new InMemoryCache(),
		});
	};

	const signIn = async (values: any) => {
		const client = createApolloClient();
		const LoginMutation = querys.AUTHENTICATE;

		const { data } = await client.mutate({
			mutation: LoginMutation,
			variables: {
				authInput: {
					...values,
				}
			},
		});

		if (data?.authenticate?.token) {
			const { token, __typename } = data?.authenticate;
			localStorage.setItem(String(__typename).toLowerCase(), token);
		}
	};

	const signOut = () => {
		localStorage.removeItem('token');
	};

	return {
		isSignedIn,
		signIn,
		signOut,
		createApolloClient,
		error,
		removeError
	};
}

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
	const { isSignedIn } = useAuth();
	if (!isSignedIn && window.location.pathname !== '/login') {
		window.location.pathname = '/login';
	}
	return <>
		{children}
	</>;
};