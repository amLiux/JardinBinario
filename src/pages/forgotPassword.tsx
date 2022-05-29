import { useFormik } from 'formik';
import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Layout } from '../components/Layout';
import { Terminal } from '../components/Terminal/Terminal';
import { TerminalButton } from '../components/Terminal/TerminalButton';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { TerminalInput } from '../components/Terminal/TerminalInput';
import { useAuth } from '../apollo/AuthClient';
import { OTPInput } from '../components/Terminal/OTPInput';
import { ForgotPasswordValues } from '../components/types/sharedTypes';
import { Step, Stepper } from '../components/Stepper';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
    const [disableButton, setDisableButton] = useState<boolean>(true);
    const router = useRouter();

    const initialValues: ForgotPasswordValues = useMemo(() => ({
        email: '',
        otp: '',
        time: '',
        newPassword: '',
        confirmPassword: '',
    }), []);

    const { forgotPasswordInit, forgotPasswordFinish } = useAuth();

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email().required('An email is required'),
            otp: Yup.string().required('The reset code is required').min(8, 'The reset coude should at least have 8 characters long'),
            newPassword: Yup.string().required('The reset code is required').min(8, 'The reset coude should at least have 8 characters long'),
            confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match'),
        }),
        enableReinitialize: true,
        // TODO can we do https://stackoverflow.com/questions/62358876/validating-only-a-part-of-formik-form-with-useformik-hook something like this so we use formik.onSubmit
        onSubmit: async function(values) {
            try {
                const message = await forgotPasswordFinish(values);
                router.push('/login');
                return message;
            } catch (err) {
                console.error(err);
            }
        },
    });

    useEffect(() => {
        if (formik.isValid && formik.dirty) {
            setDisableButton(false);
        } else setDisableButton(true);
    }, [formik]);

    return (
        <>
            <Layout>
                <div className="flex justify-center">
                    <Terminal>
                        <TerminalHeader header="Forgot your password?" />
                        <Stepper>
                            <Step
                                onSubmit={(e: SyntheticEvent) => {
                                    const { email } = formik.values;
                                    return forgotPasswordInit(email);
                                }}
                            >
                                <TerminalInput
                                    error={formik.errors?.email}
                                    onChange={formik.handleChange}
                                    value={formik.values?.email}
                                    id="email"
                                    type="text"
                                    label="Email"
                                />
                                <TerminalButton disabled={formik.values.email === ''} text="Get reset code" />
                            </Step>

                            <Step>
                                <OTPInput error={formik.errors?.otp} setFormikOtp={formik.setFieldValue} length={8} />
                                <TerminalButton disabled={formik.values.otp === ''} text="Validate" />
                            </Step>
                            <Step onSubmit={formik.handleSubmit}>
                                <TerminalInput
                                    error={formik.errors?.newPassword}
                                    onChange={formik.handleChange}
                                    value={formik.values?.newPassword}
                                    id="newPassword"
                                    type="password"
                                    label="New Password"
                                />
                                <TerminalInput
                                    error={formik.errors?.confirmPassword}
                                    onChange={formik.handleChange}
                                    value={String(formik.values?.confirmPassword)}
                                    id="confirmPassword"
                                    type="password"
                                    label="Confirm it"
                                />
                                <TerminalButton disabled={disableButton} text="Save new password" />
                            </Step>
                        </Stepper>
                    </Terminal>
                </div>
            </Layout>
        </>
    )
}
