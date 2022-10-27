import { Layout } from '../components/Layout';
import { Terminal } from '../components/Terminal/Terminal';
import { TerminalButton } from '../components/Terminal/TerminalButton';
import { Form } from '../components/Form';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { TerminalInput } from '../components/Terminal/TerminalInput';
import { Checkbox } from '../components/Checkbox';
import { withAuth } from '../hoc/withAuth';
import { PicUpload } from '../components/PicUpload';
import { useRegister } from '../hooks/useRegister';
import { RegisterFormValues } from '../types/sharedTypes';

const RegisterPage = () => {

	const {
		inputFileRef,
		onFilechange,
		selectedFile,
		formik,
		handleCheckboxChange,
		initialValues,
		disableButton
	} = useRegister();

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
									);
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

							<Checkbox
								message='I agree to the'
								tooltipToHover='Privacy Policy.'
								tooltip='We gather some information from your browser, device and timezone to keep our application updated.'
								handleCheck={handleCheckboxChange}
							/>
							<TerminalButton disabled={disableButton} text='Register' />
						</Form>
					</Terminal>
				</div>
			</Layout>
		</>
	);
};

export default withAuth(RegisterPage);