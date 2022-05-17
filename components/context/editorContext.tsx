import { FormikHandlers, FormikHelpers } from 'formik';
import { createContext } from 'react';
import { NewBlogEntryValues } from '../types/sharedTypes';

type formikHelper = FormikHelpers<NewBlogEntryValues>['setFieldValue']; 

export type EditorContext = {
    setBlogTitle: formikHelper;
    title:string;

    setVisualMarkdown: (prop:string) => void;
    visualMarkdown: string;

    tags:string[];
    setTags: formikHelper;

    setMarkdownText: formikHelper;
    markdownText: string;
}

const defaultContext:EditorContext = {
    markdownText: '',
    title: '',
    visualMarkdown: '',
    tags: [],
    setTags: (prop:string, value:string[]) => {},
    setVisualMarkdown: (prop:string) => {},
    setBlogTitle: (prop:string, value:string) => {},
    setMarkdownText: (prop:string, value:string) => {}
};

export default createContext(defaultContext)