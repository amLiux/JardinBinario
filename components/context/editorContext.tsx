import { FormikHandlers, FormikHelpers } from 'formik';
import { createContext } from 'react';
import { NewBlogEntryValues } from '../types/sharedTypes';

type formikHelper = FormikHelpers<NewBlogEntryValues>['setFieldValue']; 

export type EditorContext = {
    setBlogTitle: formikHelper;
    title:string;

    setVisualMarkdown: (prop:string) => void;
    visualMarkdown: string;

    publishBlog: FormikHandlers['handleSubmit'];

    setMarkdownText: formikHelper;
    markdownText: string;
}

const defaultContext:EditorContext = {
    markdownText: '',
    title: '',
    visualMarkdown: '',
    publishBlog: () => {},
    setVisualMarkdown: (prop:string) => {},
    setBlogTitle: (prop:string, value:string) => {},
    setMarkdownText: (prop:string, value:string) => {}
};

export default createContext(defaultContext)