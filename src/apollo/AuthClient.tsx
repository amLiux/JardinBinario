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

type Message = {
	msg: string;
	error: boolean;
};

// const backEnd = 'https://jardinbinario-be.herokuapp.com';
const backEnd = process.env.backendUrl || 'http://localhost:4000';

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

export const useAuth = ():any => {
	return useContext(authContext);
}

export const createUnauthorizedApolloClient = () => {
	const httpLink = createHttpLink({
		uri: backEnd,
	});

	const handleOnError = onError((error: any) => {
		const { graphQLErrors } = error;
		let { message } = graphQLErrors[0];
		// this happens if the GQL server runs up with issues while creating our context
		const toRemoveIfIncludes = 'Context creation failed: '; 
		const toChangeIfIncludes = 'MongoServerError: E11000';

		// TODO check this later man, its gross haha
		if(message.includes(toChangeIfIncludes)) {
			message = 'Duplicated blog title, try a different one.';
		}

		if (message.includes(toRemoveIfIncludes)) {
			message = message.replace(toRemoveIfIncludes, '');
		}
		console.error(error);
	});

	return new ApolloClient({
		link: handleOnError.concat(httpLink),
		cache: new InMemoryCache(),
	});
};

function useProviderAuth() {
	const [message, setMessage] = useState<Message>({
		msg: '',
		error: false,
	});

	function getAuthToken() {
		const token = localStorage.getItem('token') || '';
		if (!token) return '';
		return token;
	}

	const removeMessage = (): void => {
		setMessage({
			msg: '',
			error: false,
		});
	};

	// TODO not sure about exposing this whenever we instance getAuth(), this happens because I think I'll also use useQuery and useMutation queries on child components,so I'll def need a client instance wrappign my parent Component
	const createApolloClient = () => {
		const httpLink = createHttpLink({
			uri: backEnd,
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
			const toChangeIfIncludes = 'MongoServerError: E11000';

			// TODO check this later man, its gross haha
			if(message.includes(toChangeIfIncludes)) {
				message = 'Duplicated blog title, try a different one.';
			}

			if (message.includes(toRemoveIfIncludes)) {
				message = message.replace(toRemoveIfIncludes, '');
			}

			setMessage({
				msg: message,
				error: true,
			});
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

	const getUserInfo = async () => {
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
	};

	const forgotPasswordInit = async (email: string) => {
		const client = createApolloClient();
		const ForgotPasswordInitMutation = querys.FORGOT_PASSWORD_INIT;

		try {
			const { data } = await client.mutate({
				mutation: ForgotPasswordInitMutation,
				variables: {
					email,
				},
			});

			if (data?.initForgotPassword) {
				return data.initForgotPassword;
			}


		} catch (err) {
			console.error(err);
		}
	};

	const forgotPasswordFinish = async (values: any) => {
		const client = createApolloClient();
		const { email, otp, newPassword } = values;
		const ForgotPasswordInitMutation = querys.FORGOT_PASSWORD_FINISH;
		delete values.confirmPassword;
		values.time = new Date().toISOString();

		try {
			const { data } = await client.mutate({
				mutation: ForgotPasswordInitMutation,
				variables: {
					forgotPasswordInput: {
						email,
						otp,
						newPassword,
						time: new Date().toISOString(),
					},
				},
			});


			if (data?.finishForgotPassword) {
				const { name } = data.finishForgotPassword;
				return `Hey ${name} your password has been updated, try to login!`;
			}

		} catch (err) {
			console.error(err);
		}
	};

	const signOut = () => {
		localStorage.removeItem('token');
	};

	return {
		signIn,
		signOut,
		createApolloClient,
		message,
		forgotPasswordInit,
		forgotPasswordFinish,
		removeMessage,
		getUserInfo,
		setMessage,
	};
}