import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Terminal } from '../components/Terminal/Terminal';
import { TerminalButton } from '../components/Terminal/TerminalButton';
import { TerminalForm } from '../components/Terminal/TerminalForm';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { TerminalInput } from '../components/Terminal/TerminalInput';
import { TerminalTosCheckbox } from '../components/Terminal/TerminalTosCheckbox';
import { useMutation } from '@apollo/client';
import { querys } from '../gql/querys';
import { withAuth } from '../HOC/withAuth';

type RegisterFormValues = {
	name: string;
	lastName: string;
	email: string;
	password: string;
};

const RegisterPage = () => {
	const [acceptedTOS, setAcceptedTOS] = useState<boolean>(false);
	const [disableButton, setDisableButton] = useState<boolean>(true);

	const handleCheckboxChange = ():void => {
		//TODO what info do we want to pull? UserAgent, browser?
		setAcceptedTOS(!acceptedTOS);
	};

	const initialValues: RegisterFormValues = {
		name: '',
		lastName: '',
		email: '',
		password: ''
	};

	const [newUser] = useMutation(querys.REGISTER);

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string().required('A name is required'),
			lastName: Yup.string().required('A last name is required'),
			email: Yup.string().email().required('An email is required'),
			password: Yup.string().required('A password name is required').min(7, 'The password should at least have 7 characters'),
		}),
		onSubmit: async (values) => {
			try {
				const data = await newUser({
					variables: {
						userInput: {
							...values,
						}
					}
				});
			} catch(err: any) {
				console.error(err);
			}
		},
	});

	useEffect(() => {
		if(formik.isValid && acceptedTOS) {
			//TODO do the fingerprint here and see how to append the fingerprint data into the request.
			setDisableButton(false);
		}
	}, [acceptedTOS, formik]);

	return (
		<>
			<Layout>
				<div className="flex justify-center">
					{/* TODO can we abstract and re-use this because its really really similar to login */}
					<Terminal>
						<TerminalHeader header="Register" />
						<TerminalForm handleSubmit={formik.handleSubmit}>
							{
								Object.keys(initialValues).map((inputValue, ind) => {
									const splittedInputValue = inputValue.split(/(?=[A-Z])/);
									const isPassword = inputValue === 'password';
									const newLabel = splittedInputValue.map(
										(element) => element.charAt(0).toUpperCase() + element.slice(1)
									).join(" ");
									const inputValueAsKey = inputValue as keyof RegisterFormValues;
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
							<TerminalTosCheckbox handleCheck={handleCheckboxChange} />
							<TerminalButton disabled={disableButton} text="Register" />
						</TerminalForm>
					</Terminal>
				</div>
			</Layout>
		</>
	);
}

export default withAuth(RegisterPage);