import { useEffect, useMemo, useState } from 'react';
import { createUnauthorizedApolloClient, useAuth } from '@/apollo/AuthClient';
import { querys } from '@/gql/querys';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { generateRequiredMessage } from '@/utils/generateRequiredMessage';
import { Image } from '@/types/sharedTypes';

export const useHero = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [image, setImage] = useState<Image>({
        prompt: '',
        date: new Date().toLocaleDateString('es'),
        img: {
            buffer: '',
            contentType: 'image/png'
        }
    });
    const { setMessage } = useAuth();

    const initialValues: Record<string, string> = useMemo(() => ({
        prompt: '',
    }), []);

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            prompt: Yup.string().required(generateRequiredMessage('prompt'))
        }),
        onSubmit: async (values) => {
            try {
                setSubmitting(true);
                const client = createUnauthorizedApolloClient();
        
                const { data: { getImageByPrompt } } = await client.query({
                    query: querys.GET_IMAGE_BY_PROMPT,
                    variables: {
                        prompt: values.prompt,
                    }
                });
                
                window.localStorage.setItem('aiImage', JSON.stringify({
                    date: getImageByPrompt.date,
                    prompt: getImageByPrompt.prompt,
                }));
                setImage(getImageByPrompt);
            } catch (err) {
                setMessage({
                    msg: err,
                    error: true,
                });
                console.error(err);
            }
        },
    });

    useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (event.key === 'Enter') formik.handleSubmit();
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        submitting,
        image,
        formik,
    };

};