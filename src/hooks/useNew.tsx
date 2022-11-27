import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useAuth } from '@/apollo/AuthClient';
import { querys } from '@/gql/querys';
import { EditorContextType, NewBlogEntryValues } from '@/types/sharedTypes';
import { generateRequiredMessage } from '@/utils/generateRequiredMessage';


export const useNew = () => {
    const [newBlogEntry] = useMutation(querys.NEW_BLOG_ENTRY);
    const [visualMarkdown, setVisualMarkdown] = useState<string>('');
    const [preview, setPreview] = useState<boolean>(false);
    const [showSneakpeak, setShowSneakpeak] = useState<boolean>(false);
    const initialValues: NewBlogEntryValues = {
        title: '',
        markdown: '',
        sneakpeak: '',
        tags: [],
    };

    const router = useRouter();
    const { setMessage } = useAuth();

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required(generateRequiredMessage('title')),
            markdown: Yup.string().required(generateRequiredMessage('markdown content')),
            tags: Yup.array().of(Yup.string()),
            sneakpeak: Yup.string().required(generateRequiredMessage('sneakpeak'))
            // .test('len', 'Must be exactly 5 characters', val => val?.toString().length === 180)
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            // we do this because if our 15 difference cap was not hit in the Editor we need to save the visual data
            values.markdown = visualMarkdown;
            try {
                const response = await newBlogEntry({
                    variables: {
                        blogInput: {
                            ...values,
                        }
                    }
                });

                if (response.data.newBlogEntry) {
                    const { title, id } = response.data.newBlogEntry;
                    setMessage({
                        msg: `The blog ${title} was created succesfuly`,
                        error: false
                    });

                    setTimeout(() => router.push({
                        pathname: '/read',
                        query: { 'blogId': id }
                    },), 2000);
                }
            } catch (err: any) {
                // do we set error here 
                console.error(err);
            }
        },
    });

    const contextValue: EditorContextType = {
        visualMarkdown,
        setVisualMarkdown,
        setPreview,
        setShowSneakpeak,
        tags: formik.values.tags || [],
        setTags: formik.setFieldValue,
        markdownText: formik.values.markdown,
        setMarkdownText: formik.setFieldValue,
        title: formik.values.title,
        setBlogTitle: formik.setFieldValue,
        storeMarkdown: () => {
            const { markdown } = formik.values;
            window.sessionStorage.setItem('markdown', markdown);
        },
    };

    useEffect(() => {
        if (window) {
            const storedMarkdown = window.sessionStorage.getItem('markdown') || '';
            if (storedMarkdown.trim().length > 0) {
                setVisualMarkdown(storedMarkdown);
                formik.setFieldValue('markdown', storedMarkdown);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        contextValue,
        formik,
        preview,
        showSneakpeak,
        router
    };

};