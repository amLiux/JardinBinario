import React, { useContext, useEffect, useState } from 'react'
import editorContext from '../context/editorContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { UserContext } from '../types/sharedTypes';

type MarkdownRestulProps = {
	preview: boolean;
	userContext?: UserContext;
};


export const MarkdownResult = ({ preview, userContext }: MarkdownRestulProps) => {
	const { visualMarkdown, setVisualMarkdown, title: mainTitle, setMarkdownText } = useContext(editorContext);
	const [title, setTitle] = useState<string>('');

	useEffect(() => {
		const titleToRemove = visualMarkdown.split('\n')[0];

		const generateUserInfo = (context: UserContext) => {
			const { lastName, name, email } = context;

			return {
				name: `> #### [${name} ${lastName}](mailto:${email})`,
				date: `> ${new Date().toLocaleDateString('es-us', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`,
			};
		};


		if (preview && userContext) {
			const { name, date } = generateUserInfo(userContext as any);
			const toSet = titleToRemove + " \n" + name + "\n" + date + "\n";

			if (!title && mainTitle !== toSet) {
				setTitle(toSet);
				setVisualMarkdown(visualMarkdown.replace(titleToRemove, toSet));
			}
		} else {
			const toRemove = visualMarkdown.split('\n')[1] + "\n" + visualMarkdown.split('\n')[2];
			if (!userContext && toRemove.includes('>')) {
				const toRemove = visualMarkdown.split('\n')[1] + "\n" + visualMarkdown.split('\n')[2];
				const newValue = visualMarkdown.replace(toRemove, '');
				setVisualMarkdown(newValue);
				setMarkdownText('markdown', newValue)
			}
		}
	}, [preview, visualMarkdown, userContext, setVisualMarkdown, title, mainTitle, setMarkdownText]);

	return (
		<>
			<div className={`markdownResult ${preview ? 'preview' : 'writing'}`}>
				<ReactMarkdown
					remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>{visualMarkdown}</ReactMarkdown>
			</div>
		</>
	)
};