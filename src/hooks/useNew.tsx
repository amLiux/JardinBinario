import { useMutation, useLazyQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useAuth } from '@/apollo/AuthClient';
import { querys } from '@/gql/querys';
import { EditorContextType, NewBlogEntryValues } from '@/types/sharedTypes';
import { generateRequiredMessage } from '@/utils/generateRequiredMessage';


export const useNew = () => {
    const router = useRouter();
    const { query: { blogId } } = router;
    const [getBlogToUpdate, { data }] = useLazyQuery(querys.GET_BLOG_BY_ID);
    const [newBlogEntry] = useMutation(querys.NEW_BLOG_ENTRY);
    const [updateBlogEntry] = useMutation(querys.UPDATE_BLOG);
    const [visualMarkdown, setVisualMarkdown] = useState<string>('');
    const [preview, setPreview] = useState<boolean>(false);
    const [showSneakpeak, setShowSneakpeak] = useState<boolean>(false);
    const blogToUpdate = data?.getSpecificBlogEntry || undefined;
    const initialValues: NewBlogEntryValues = {
        title: blogToUpdate ? blogToUpdate.title : '',
        markdown: blogToUpdate ? blogToUpdate.markdown : '',
        sneakpeak: blogToUpdate ? blogToUpdate.sneakpeak : '',
        tags: blogToUpdate ? blogToUpdate.tags : [],
    };

    const { setMessage } = useAuth();

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required(generateRequiredMessage('title')),
            markdown: Yup.string().required(generateRequiredMessage('markdown content')),
            tags: Yup.array().of(Yup.string()),
            sneakpeak: Yup.string().required(generateRequiredMessage('sneakpeak'))
                .min(190, 'It must contain at least 190 characters')
                .max(310, 'It must contain less than 310 characters')
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            // we do this because if our 15 difference cap was not hit in the Editor we need to save the visual data
            values.markdown = visualMarkdown;
            try {
                const handler = blogToUpdate ? updateBlogEntry : newBlogEntry;
                const prop = blogToUpdate ? 'updateBlogEntry' : 'newBlogEntry';
                const action = blogToUpdate ? 'updated' : 'created';

                if (blogId) values._id = Array.isArray(blogId) ? blogId[0] : blogId;

                console.log(values);

                const response = await handler({
                    variables: {
                        blogInput: {
                            ...values,
                        }
                    }
                });

                if (response.data[prop]) {
                    const { title, _id } = response.data[prop];
                    setMessage({
                        msg: `The blog ${title} was ${action} succesfuly`,
                        error: false
                    });

                    setTimeout(() => router.push(`/read/${_id}`), 2000);
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
        if (blogId) {
            getBlogToUpdate({
                variables: {
                    blogId,
                }
            });
        }

        if (window) {
            const storedMarkdown = window.sessionStorage.getItem('markdown') || '';
            if (storedMarkdown.trim().length > 0) {
                setVisualMarkdown(storedMarkdown);
                formik.setFieldValue('markdown', storedMarkdown);
            }
        }

        if (blogToUpdate) {
            setVisualMarkdown(blogToUpdate.markdown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogToUpdate]);

    return {
        contextValue,
        formik,
        preview,
        showSneakpeak,
        router
    };

};