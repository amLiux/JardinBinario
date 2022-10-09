import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { querys } from '../gql/querys';
import { RegisterFormValues } from '../types/sharedTypes';

export const useRegister = () => {
    const [acceptedTOS, setAcceptedTOS] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(true);
    const [selectedFile, setSelectedFile] = useState<string>();

    const onFilechange = ({ target }: any) => {
        const file = target.files[0];
        setSelectedFile(URL.createObjectURL(file));
        formik.setFieldValue('file', file);
    };

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
                // TODO do we set error here 
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

    return {
        inputFileRef,
        onFilechange,
        selectedFile,
        formik,
        handleCheckboxChange,
        initialValues,
        disableButton
    };
};