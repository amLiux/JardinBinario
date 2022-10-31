import { useContext, useEffect, useState } from 'react';
import editorContext from '@/context/editorContext';
import { BlogEntry, UserContext } from '@/types/sharedTypes';
import markdownResultsStyles from '@/components/NewBlog/MarkdownResult/MarkdownResult.module.css';

export const useMarkdownResult = (preview:boolean, context?:UserContext, blogEntry?:BlogEntry) => {
    const { visualMarkdown, setVisualMarkdown, title: mainTitle, setMarkdownText } = useContext(editorContext);
    const [title, setTitle] = useState<string>('');
    const [toRender, setToRender] = useState<string>('');

    useEffect(() => {
        const titleToRemove = visualMarkdown.split('\n')[0] || blogEntry?.markdown?.split('\n')[0] || '';

        const generateUserInfo = (context: UserContext, createdAt?: string) => {
            const { lastName, name, email, avatar } = context;
            const fullName = `${name} ${lastName}`;
            //TODO this is messed up, it works but it's ugly, debug this later
            return {
                name: ` <div className='${markdownResultsStyles.identityText}'> [${fullName}](mailto:${email})`,
                date: ` <p> ${new Date(createdAt ? createdAt : new Date()).toLocaleDateString('es-us', { year: 'numeric', month: 'long', day: 'numeric' })} </p> </div> </blockquote>`,
                avatar: `<blockquote className='${markdownResultsStyles.identityContainer}'> ![${fullName} profile pic](${avatar})`,
            };
        };


        if (preview && context) {

            const { name, date, avatar } = generateUserInfo(context as any, blogEntry?.createdAt);
            const toSet = titleToRemove + avatar + name + date + '\n';

            if (blogEntry) {
                setToRender(blogEntry.markdown.replace(titleToRemove, toSet));
            }

            if (!title && mainTitle !== toSet) {
                setTitle(toSet);
                setVisualMarkdown(visualMarkdown.replace(titleToRemove, toSet));
            }
        } else {
            const firstHTMLTag = titleToRemove.indexOf('<');
            const toRemove = titleToRemove.substring(firstHTMLTag, titleToRemove.length);
            if (toRemove.includes('<blockquote')) {
                const newValue = visualMarkdown.replace(toRemove, '');
                setVisualMarkdown(newValue);
                setMarkdownText('markdown', newValue);
            }
        }
    }, [preview, visualMarkdown, context, setVisualMarkdown, title, mainTitle, setMarkdownText, blogEntry]);

    return {
        toRender,
        visualMarkdown
    };

};