import EditorContext from '@/context/editorContext';
import { Editor } from '@/components/NewBlog/Editor';
import { Layout } from '@/components/Layout';
import { MarkdownResult } from '@/components/NewBlog/MarkdownResult';
import { TerminalHeader } from '@/components/Terminal/TerminalHeader';
import { withAuth } from '@/hoc/withAuth';
import { UserContext } from '@/types/sharedTypes';
import { useNew } from '@/hooks/useNew';

type NewBlogPageProps = {
	userContext: UserContext;
};

const NewBlogPage = ({ userContext }: NewBlogPageProps) => {

	const {
		contextValue,
		formik,
		preview
	} = useNew();

	return (

		<EditorContext.Provider value={contextValue}>
			<Layout>
				<TerminalHeader read={preview} editor header={`${formik.values.title || 'New blog entry'}`} />
				{
					preview
						?
						<>
							<MarkdownResult context={userContext} preview={preview} />
						</>
						:
						<form
							className='flex justify-around items-center h-screen p-4'
							id='newBlogEntryForm'
							onSubmit={formik.handleSubmit}>
							<Editor />
							<MarkdownResult preview={preview} />
						</form>
				}
			</Layout>
		</EditorContext.Provider>

	);
};

export default withAuth(NewBlogPage);