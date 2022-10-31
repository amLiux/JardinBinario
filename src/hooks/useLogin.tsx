import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { useAuth } from '@/apollo/AuthClient';
import { LoginFormValues } from '@/types/sharedTypes';

export const useLogin = () => {
    const [disableButton, setDisableButton] = useState<boolean>(true);

    const initialValues: LoginFormValues = useMemo(() => ({
        email: '',
        password: ''
    }), []);

    const { signIn } = useAuth();
    const router = useRouter();

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email().required('An email is required'),
            password: Yup.string().required('A password name is required').min(7, 'The password should at least have 7 characters'),
        }),
        onSubmit: async (values) => {
            try {
                await signIn(values);
                router.push('/new');
            } catch (err) {
                console.error(err);
            }
        },
    });

    useEffect(() => {
        if (formik.isValid && formik.dirty) {
            //TODO do the fingerprint here and see how to append the fingerprint data into the request.
            setDisableButton(false);
        } else setDisableButton(true);
    }, [formik]);

    return {
        initialValues,
        disableButton,
        formik,
        router
    };

};