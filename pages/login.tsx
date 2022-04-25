import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { HelpMessage } from '../components/HelpMessage';
import { Layout } from '../components/Layout';
import { Terminal } from '../components/Terminal/Terminal';
import { TerminalButton } from '../components/Terminal/TerminalButton';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { TerminalInput } from '../components/Terminal/TerminalInput';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { querys } from '../gql/querys';
import { TerminalForm } from '../components/Terminal/TerminalForm';

type LoginFormValues = {
	email: string;
	password: string;
};

export default function LoginPage() {
	const [disableButton, setDisableButton] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	const initialValues: LoginFormValues = useMemo(() => ({
		email: '',
		password: ''
	}), []);

	const [authenticate] = useMutation(querys.AUTHENTICATE);

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			email: Yup.string().email().required('An email is required'),
			password: Yup.string().required('A password name is required').min(7, 'The password should at least have 7 characters'),
		}),
		onSubmit: async (values) => {
			try {
				const { data } = await authenticate({
					variables: {
						authInput: {
							...values,
						}
					}
				});

				const { token, __typename } = data.authenticate;
				localStorage.setItem(String(__typename).toLowerCase(), token);
			} catch (err: any) {
				const { graphQLErrors } = err;
				const { message } = graphQLErrors[0];
				console.log(message);
				setError(message);
			}
		},
	});

	useEffect(() => {
		if (formik.isValid && formik.dirty) {
			//TODO do the fingerprint here and see how to append the fingerprint data into the request.
			setDisableButton(false);
		} else setDisableButton(true);
	}, [formik]);

	return (
		<>
			<Layout handleError={setError} error={error}>
				<div className="flex justify-center">
					<Terminal>
						<TerminalHeader header="Login" />
						<TerminalForm handleSubmit={formik.handleSubmit}>
							{
								Object.keys(initialValues).map((inputValue, ind) => {
									const splittedInputValue = inputValue.split(/(?=[A-Z])/);
									const isPassword = inputValue === 'password';
									const newLabel = splittedInputValue.map(
										(element) => element.charAt(0).toUpperCase() + element.slice(1)
									).join(" ");
									const inputValueAsKey = inputValue as keyof LoginFormValues;
									return (
										<TerminalInput
											error={formik.errors?.[inputValueAsKey]}
											onChange={formik.handleChange}
											value={formik.values?.[inputValueAsKey]}
											key={`${inputValue}-${ind}`}
											id={inputValue}
											type={isPassword ? "password" : "text"}
											label={newLabel}
										/>
									);
								})
							}
							<TerminalButton disabled={disableButton} text="Sign In" />
							<HelpMessage text="Forgot your password?" />
						</TerminalForm>
					</Terminal>
				</div>
			</Layout>
		</>
	)
}
