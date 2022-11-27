import EditorContext from '@/context/editorContext';
import { Editor } from '@/components/NewBlog/Editor';
import { Layout } from '@/components/Layout';
import { MarkdownResult } from '@/components/NewBlog/MarkdownResult';
import { TerminalHeader } from '@/components/Terminal/TerminalHeader';
import { withAuth } from '@/hoc/withAuth';
import { UserContext } from '@/types/sharedTypes';
import { useNew } from '@/hooks/useNew';
import { Footer } from '@/components/Footer';
import { Sneakpeak } from '@/components/NewBlog/Sneakpeak';

type NewBlogPageProps = {
	userContext: UserContext;
};

const NewBlogPage = ({ userContext }: NewBlogPageProps) => {

	const {
		contextValue,
		formik,
		preview,
		showSneakpeak,
		router
	} = useNew();

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
				{
					preview
						?
						<MarkdownResult context={userContext} preview={preview} />
						:
						<form
							className='flex justify-around items-start h-screen p-4'
							id='newBlogEntryForm'
							onSubmit={formik.handleSubmit}>
							<Editor />
							<MarkdownResult preview={preview} />
						</form>
				}
				<Footer router={router} filePath='new' />
			</Layout>
		</EditorContext.Provider>

	);
};

export default withAuth(NewBlogPage);