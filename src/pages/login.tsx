import { HelpMessage } from '@/components/HelpMessage';
import { Layout } from '@/components/Layout';
import { Terminal } from '@/components/Terminal/Terminal';
import { TerminalButton } from '@/components/Terminal/TerminalButton';
import { TerminalHeader } from '@/components/Terminal/TerminalHeader';
import { TerminalInput } from '@/components/Terminal/TerminalInput';
import { Form } from '@/components/Form';
import { LoginFormValues } from '@/types/sharedTypes';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
	
	const {
		disableButton,
		formik,
		initialValues,
		router
	} = useLogin();

	return (
		<>
			<Layout>
				<div className='flex justify-center'>
					<Terminal>
						<TerminalHeader header='Login' />
						<Form terminal handleSubmit={formik.handleSubmit}>
							{
								Object.keys(initialValues).map((inputValue, ind) => {
									const splittedInputValue = inputValue.split(/(?=[A-Z])/);
									const isPassword = inputValue === 'password';
									const newLabel = splittedInputValue.map(
										(element) => element.charAt(0).toUpperCase() + element.slice(1)
									).join(' ');
									const inputValueAsKey = inputValue as keyof LoginFormValues;
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
							<TerminalButton disabled={disableButton} text='Sign In' />
							<HelpMessage text='Forgot your password?' onClick={() => router.push('/forgotPassword')}/>
						</Form>
					</Terminal>
				</div>
			</Layout>
		</>
	);
}
