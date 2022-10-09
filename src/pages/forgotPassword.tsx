import { SyntheticEvent} from 'react';
import { Layout } from '../components/Layout';
import { Terminal } from '../components/Terminal/Terminal';
import { TerminalButton } from '../components/Terminal/TerminalButton';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { TerminalInput } from '../components/Terminal/TerminalInput';
import { OTPInput } from '../components/Terminal/OTPInput';
import { Step, Stepper } from '../components/Stepper';
import { useForgotPassword } from '../hooks/useForgotPassword';

export default function ForgotPassword() {
    
    const {
        formik,
        disableButton,
        forgotPasswordInit
    } = useForgotPassword();

    return (
        <>
            <Layout>
                <div className='flex justify-center'>
                    <Terminal>
                        <TerminalHeader header='Forgot your password?' />
                        <Stepper>
                            <Step
                                onSubmit={(e: SyntheticEvent) => {
                                    // TODO need to check if there is a user with this email
                                    const { email } = formik.values;
                                    return forgotPasswordInit(email);
                                }}
                            >
                                <TerminalInput
                                    error={formik.errors?.email}
                                    onChange={formik.handleChange}
                                    value={formik.values?.email}
                                    id='email'
                                    type='text'
                                    label='Email'
                                />
                                <TerminalButton disabled={formik.values.email === ''} text='Get reset code' />
                            </Step>

                            <Step>
                                <OTPInput error={formik.errors?.otp} setFormikOtp={formik.setFieldValue} length={8} />
                                <TerminalButton disabled={formik.values.otp === ''} text='Validate' />
                            </Step>
                            <Step onSubmit={formik.handleSubmit}>
                                <TerminalInput
                                    error={formik.errors?.newPassword}
                                    onChange={formik.handleChange}
                                    value={formik.values?.newPassword}
                                    id='newPassword'
                                    type='password'
                                    label='New Password'
                                />
                                <TerminalInput
                                    error={formik.errors?.confirmPassword}
                                    onChange={formik.handleChange}
                                    value={String(formik.values?.confirmPassword)}
                                    id='confirmPassword'
                                    type='password'
                                    label='Confirm it'
                                />
                                <TerminalButton disabled={disableButton} text='Save new password' />
                            </Step>
                        </Stepper>
                    </Terminal>
                </div>
            </Layout>
        </>
    );
}
