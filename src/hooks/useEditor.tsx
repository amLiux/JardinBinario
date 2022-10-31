import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import editorContext from '@/context/editorContext';

export const useEditor = () => {

    const [defaultValue, setDefaultValue] = useState<string>();

    const MAX_CHARS = 1000;
    const { setVisualMarkdown, setBlogTitle, title, setMarkdownText, markdownText } = useContext(editorContext);

    const onInputChange = (e: SyntheticEvent) => {
        const newValue = (e.target as HTMLInputElement).value;
        setVisualMarkdown(newValue);

        if (newValue.length >= MAX_CHARS) {
            if (newValue !== markdownText) {
                const difference = newValue.length > markdownText.length
                    ? newValue.length - markdownText.length
                    : markdownText.length - newValue.length;
                // update the text that is going into formik every 15 chards to avoid that much consuption
                if (difference >= 15) {
                    setMarkdownText('markdown', newValue);
                }
            }
        } else setMarkdownText('markdown', newValue);

        const titleToSet = newValue.split('\n')[0].replace('#', '');
        if (titleToSet !== title) {
            setBlogTitle('title', titleToSet);
        }

    };

    useEffect(() => {
        setDefaultValue(markdownText);
    }, [markdownText]);

    return {
        onInputChange,
        defaultValue,
    };

};