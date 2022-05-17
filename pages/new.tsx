import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditorContext from '../components/context/editorContext';
import { Editor } from '../components/NewBlog/Editor';
import { Layout } from '../components/Layout';
import { MarkdownResult } from '../components/NewBlog/MarkdownResult';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { withAuth } from '../hoc/withAuth';
import { querys } from '../gql/querys';
import { NewBlogEntryValues } from '../components/types/sharedTypes';
import { useAuth } from '../apollo/AuthClient';
import { useRouter } from 'next/router';

const NewBlogPage = () => {

	const [newBlogEntry] = useMutation(querys.NEW_BLOG_ENTRY);
	const [visualMarkdown, setVisualMarkdown] = useState<string>('');

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

				if(response.data.newBlogEntry) {
					const {title, id} = response.data.newBlogEntry;
					setMessage({
						msg: `The blog ${response.data.newBlogEntry.title} was created succesfuly`,
						error: false
					});

					// TODO once we have a page that resolves blogs, let's redirect from here/ do we do title or id?
					setTimeout(() => router.push(`/${encodeURIComponent(title)}`), 2000);
				}
			} catch (err: any) {
				// do we set error here 
				console.error(err);
			}
		},
	});

	const contextValue = {
		visualMarkdown,
		setVisualMarkdown,

		tags: formik.values.tags,
		setTags: formik.setFieldValue,
		markdownText: formik.values.markdown,
		setMarkdownText: formik.setFieldValue,
		
		title: formik.values.title,
		setBlogTitle: formik.setFieldValue,
	};

	return (
		<>
			<EditorContext.Provider value={contextValue as any}>
				<Layout>
					<TerminalHeader editor header={`${formik.values.title || 'New blog entry'}`} />
					<form className="flex justify-around h-screen p-4" id="newBlogEntryForm" onSubmit={formik.handleSubmit}>
						<Editor />
						<MarkdownResult />
					</form>
				</Layout>
			</EditorContext.Provider>
		</>
	);
}

export default withAuth(NewBlogPage);