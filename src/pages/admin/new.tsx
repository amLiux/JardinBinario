import EditorContext from '@/context/editorContext';
import { Editor } from '@/components/NewBlog/Editor';
import { Layout } from '@/layouts/Layout';
import { MarkdownResult } from '@/components/NewBlog/MarkdownResult';
import { TerminalHeader } from '@/components/Terminal/TerminalHeader';
import { withAuth } from '@/hoc/withAuth';
import { UserContext } from '@/types/sharedTypes';
import { useNew } from '@/hooks/useNew';
import { Footer } from '@/components/Footer';
import { Sneakpeak } from '@/components/NewBlog/Sneakpeak';
import { BlogCard } from '@/components/Blogs/BlogCard';

type NewBlogPageProps = {
  userContext: UserContext;
};

const NewBlogPage = ({ userContext }: NewBlogPageProps) => {
  const { contextValue, formik, preview, showSneakpeak, router } = useNew();

  return (
    <EditorContext.Provider value={contextValue}>
      <Layout>
        <TerminalHeader
          read={preview}
          editor
          header={`${formik.values.title || 'New blog entry'}`}
        />
        <Sneakpeak
          sneakpeak={formik.values.sneakpeak}
          setSneakpeak={formik.handleChange}
          showSneakpeak={showSneakpeak}
        />
        {preview ? (
          <MarkdownResult context={userContext} preview={preview} />
        ) : (
          <form
            className="flex justify-around items-start h-screen p-4"
            id="newBlogEntryForm"
            onSubmit={formik.handleSubmit}
          >
            <Editor />
            <MarkdownResult preview={preview} />
          </form>
        )}

        <div className="w-[480px] m-auto mb-20">
          <BlogCard
            preview
            id="preview"
            title={formik?.values.title}
            name={userContext?.name}
            lastName={userContext?.lastName}
            avatar={userContext?.avatar}
            createdAt={new Date().toISOString()}
            blogShares={0}
            blogViews={0}
            tags={formik?.values.tags}
            sneakpeak={formik?.values.sneakpeak}
          />
        </div>

        <Footer router={router} filePath="new" />
      </Layout>
    </EditorContext.Provider>
  );
};

export default withAuth(NewBlogPage);
