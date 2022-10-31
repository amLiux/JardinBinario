import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '@/apollo/AuthClient';
import { ForgotPasswordValues } from '@/types/sharedTypes';

export const useForgotPassword = () => {
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
        onSubmit: async function (values) {
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

    return {
        formik,
        forgotPasswordInit,
        disableButton
    };

};