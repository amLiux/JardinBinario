import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';

import { Layout } from '../components/Layout';
import { Terminal } from '../components/Terminal/Terminal';
import { TerminalButton } from '../components/Terminal/TerminalButton';
import { Form } from '../components/Form';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { TerminalInput } from '../components/Terminal/TerminalInput';
import { TerminalTosCheckbox } from '../components/Terminal/TerminalTosCheckbox';
import { querys } from '../gql/querys';
import { withAuth } from '../hoc/withAuth';
import { PicUpload } from '../components/PicUpload';

type RegisterFormValues = {
	name: string;
	lastName: string;
	email: string;
	password: string;
	file: string;
};

const RegisterPage = () => {
	const [acceptedTOS, setAcceptedTOS] = useState<boolean>(false);
	const [disableButton, setDisableButton] = useState<boolean>(true);
	const [selectedFile, setSelectedFile] = useState<string>();

	const onFilechange = ({target}: any) => {
		const file = target.files[0];
		setSelectedFile(URL.createObjectURL(file));
		formik.setFieldValue('file', file);
	}

	const handleCheckboxChange = (): void => {
		//TODO what info do we want to pull? UserAgent, browser?
		setAcceptedTOS(!acceptedTOS);
	};
	const inputFileRef = useRef<HTMLInputElement>(null);
	const initialValues: RegisterFormValues = {
		name: '',
		lastName: '',
		email: '',
		password: '',
		file: '',
	};

	const [newUser] = useMutation(querys.REGISTER);

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string().required('A name is required'),
			lastName: Yup.string().required('A last name is required'),
			email: Yup.string().email().required('An email is required'),
			password: Yup.string().required('A password name is required').min(7, 'The password should at least have 7 characters'),
			file: Yup.mixed().required('Profile pic is required'),
			avatar: Yup.string()
		}),
		onSubmit: async (values) => {
			try {
				const formData = new FormData();
				formData.append('upload_preset', 'jardin-binario-avatars');
				formData.append('file', values.file);

				const response = await fetch(String(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL), {
					method: 'POST',
					body: formData,
				});

				const { secure_url } = await response.json();
				const { file, ...toUpload } = values;

				const data = await newUser({
					variables: {
						userInput: {
							...toUpload,
							avatar: secure_url
						}
					}
				});

				//TODO do something or redirect
			} catch (err: any) {
				// do we set error here 
				console.error(err);
			}
		},
	});

	useEffect(() => {
		if (formik.isValid && acceptedTOS) {
			//TODO do the fingerprint here and see how to append the fingerprint data into the request.
			setDisableButton(false);
		}
	}, [acceptedTOS, formik]);

	return (
		<>
			<Layout>
				<div className='flex justify-center'>
					{/* TODO can we abstract and re-use this because its really really similar to login */}
					<Terminal>
						<TerminalHeader header='Register' />
						<div onClick={() => {
							inputFileRef.current?.click();
						}} className='mb-20'>
							<PicUpload selectedFile={selectedFile} />
						</div>
						<Form terminal handleSubmit={formik.handleSubmit}>
							{
								Object.keys(initialValues).map((inputValue, ind) => {
									if (inputValue === 'file') return (
										<input
											className='hidden'
											type='file'
											ref={inputFileRef}
											onChange={(e: any) => onFilechange(e)}
										/>
									)
									const splittedInputValue = inputValue.split(/(?=[A-Z])/);
									const isPassword = inputValue === 'password';
									const newLabel = splittedInputValue.map(
										(element) => element.charAt(0).toUpperCase() + element.slice(1)
									).join(' ');
									const inputValueAsKey = inputValue as keyof RegisterFormValues;

									return (
										<TerminalInput
											error={formik.errors?.[inputValueAsKey]}
											onChange={formik.handleChange}
											value={formik.values?.[inputValueAsKey]}
											key={`${inputValue}-${ind}`}
											id={inputValue}
											type={isPassword ? 'password' : 'text'}
											label={newLabel}
										/>
									);
								})
							}

							<TerminalTosCheckbox handleCheck={handleCheckboxChange} />
							<TerminalButton disabled={disableButton} text='Register' />
						</Form>
					</Terminal>
				</div>
			</Layout>
		</>
	);
}

export default withAuth(RegisterPage);