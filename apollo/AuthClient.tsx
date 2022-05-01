import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { setContext } from '@apollo/client/link/context';
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import { querys } from '../gql/querys';
import { onError } from '@apollo/client/link/error';
const authContext = createContext({});

type AuthProviderProps = {
	children: ReactNode;
}

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

	function getAuthToken() {
		const token = localStorage.getItem('token') || '';
		if (!token) return '';
		return token;
	}

	const removeError = (): void => {
		setError('');
	};

	// TODO not sure about exposing this whenever we instance getAuth(), this happens because I think I'll also use useQuery and useMutation queries on child components,so I'll def need a client instance wrappign my parent Component
	const createApolloClient = () => {
		const httpLink = createHttpLink({
			uri: 'http://localhost:4000',
		});

		const setAuthorizationInContext = setContext((_, prevContext) => {
			return {
				...prevContext,
				headers: {
					...prevContext.headers,
					Authorization: `Bearer ${getAuthToken()}`,
				},
			};
		});

		const handleOnError = onError((error: any) => {
			const { graphQLErrors } = error;
			let { message } = graphQLErrors[0];
			// this happens if the GQL server runs up with issues while creating our context
			const toRemoveIfIncludes = 'Context creation failed: ';
			if(message.includes(toRemoveIfIncludes)) {
				message = message.replace(toRemoveIfIncludes, '');
			}
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

	const getUserInfo = async(values:any) => {
		const client = createApolloClient();
		const GetUserInfoQuery = querys.GET_USER_INFO;

		try {
			const { data } = await client.mutate({
				mutation: GetUserInfoQuery
			});

			if (data?.getUserInfo) {
				return data.getUserInfo;
			}
	
		} catch (err) {
			console.error(err);
		}
	}

	const signOut = () => {
		localStorage.removeItem('token');
	};

	return {
		signIn,
		signOut,
		createApolloClient,
		error,
		removeError,
		getUserInfo,
	};
}