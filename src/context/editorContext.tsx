import { createContext } from 'react';
import { EditorContextType } from '@/types/sharedTypes';

const defaultContext:EditorContextType = {
    markdownText: '',
    title: '',
    visualMarkdown: '',
    tags: [],
    setShowSneakpeak: (prop: boolean) => {},
    setTags: (prop:string, value:string[]) => {},
    setPreview: (prop: boolean) => {},
    setVisualMarkdown: (prop:string) => {},
    setBlogTitle: (prop:string, value:string) => {},
    setMarkdownText: (prop:string, value:string) => {},
    storeMarkdown: () => {}
};

export default createContext(defaultContext);
