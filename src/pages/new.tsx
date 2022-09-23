import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditorContext from '../context/editorContext';
import { Editor } from '../components/NewBlog/Editor';
import { Layout } from '../components/Layout';
import { MarkdownResult } from '../components/NewBlog/MarkdownResult';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { withAuth } from '../hoc/withAuth';
import { querys } from '../gql/querys';
import { EditorContextType, NewBlogEntryValues, UserContext } from '../types/sharedTypes';
import { useAuth } from '../apollo/AuthClient';
import { useRouter } from 'next/router';

type NewBlogPageProps = {
	userContext: UserContext;
};

const NewBlogPage = ({ userContext }: NewBlogPageProps) => {
	const [newBlogEntry] = useMutation(querys.NEW_BLOG_ENTRY);
	const [visualMarkdown, setVisualMarkdown] = useState<string>('');
	const [preview, setPreview] = useState<boolean>(false);

	const initialValues: NewBlogEntryValues = {
		title: '',
		markdown: '',
		tags: [],
	};

	const router = useRouter();
	const { setMessage } = useAuth();

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			title: Yup.string().required('A name is required'),
			markdown: Yup.string().required('A last name is required'),
			tags: Yup.array().of(Yup.string()),
		}),
		enableReinitialize: true,
		onSubmit: async (values) => {
			// we do this because if our 15 difference cap was not hit in the Editor we need to save the visual data
			values.markdown = visualMarkdown;
			try {
				const response = await newBlogEntry({
					variables: {
						blogInput: {
							...values,
						}
					}
				});

				if (response.data.newBlogEntry) {
					const { title, id } = response.data.newBlogEntry;
					setMessage({
						msg: `The blog ${title} was created succesfuly`,
						error: false
					});

					// TODO once we have a page that resolves blogs, let's redirect from here/ do we do title or id?
					setTimeout(() => router.push({
						pathname: '/read',
						query: {'blogId': id} 
					}, ), 2000);
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
		if(window) {
			const storedMarkdown = window.sessionStorage.getItem('markdown') || '';
			if (storedMarkdown.trim().length > 0) {
				setVisualMarkdown(storedMarkdown);
				formik.setFieldValue('markdown', storedMarkdown);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<EditorContext.Provider value={contextValue}>
				<Layout>
					<TerminalHeader editor header={`${formik.values.title || 'New blog entry'}`} />
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
		</>
	);
}

export default withAuth(NewBlogPage);