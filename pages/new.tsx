import { useState } from 'react';
import EditorContext from '../components/context/editorContext';
import { Editor } from '../components/NewBlog/Editor';
import { Layout } from '../components/Layout';
import { MarkdownResult } from '../components/NewBlog/MarkdownResult';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { withAuth } from '../hoc/withAuth';

const NewBlogPage = () => {

    const [markdownText, setMarkdownText] = useState<string>('');

    const contextValue = {
        markdownText,
        setMarkdownText,
    };

    return (
        <>
            <EditorContext.Provider value={contextValue as any}>
                <Layout>
                    <TerminalHeader editor header="New blog entry" />
                    <div className="flex justify-around h-screen p-4">
                        <Editor/>
                        <MarkdownResult/>
                    </div>
                </Layout>
            </EditorContext.Provider>
        </>
    );
}

export default withAuth(NewBlogPage);