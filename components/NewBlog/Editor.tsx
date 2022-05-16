import React, { SyntheticEvent, useContext } from 'react';
import editorContext from '../context/editorContext';



export const Editor = () => {

	const MAX_CHARS = 1000;
	const { setVisualMarkdown, setBlogTitle, title, setMarkdownText, markdownText } = useContext(editorContext);

	const onInputChange = (e: SyntheticEvent) => {
		const newValue = (e.target as HTMLInputElement).value;
		setVisualMarkdown(newValue);
		if(newValue.length >= MAX_CHARS) {
			if(newValue !== markdownText) {
				const difference = newValue.length > markdownText.length ? newValue.length - markdownText.length: markdownText.length - newValue.length;
				// update the text that is going into formik every 15 chards to avoid that much consuption
				if(difference >= 15) {
					setMarkdownText('markdown', newValue);
				}
			}
		} else setMarkdownText('markdown', newValue);

		
		if(newValue.split("\n").length === 1) {
			const titleToSet = newValue.split("\n")[0].replace('#', '');
			if(titleToSet !== title) setBlogTitle('title', titleToSet);
		}

	}

	return (
		<textarea
			onChange={onInputChange}
			className="h-[49rem] font-mono outline outline-offset-1 outline-3 outline-transparent focus:outline-purple-500 w-4/12 rounded-md resize-none text-xl text-white bg-slate-800 outline-none p-5 pl-10" />
	)
}