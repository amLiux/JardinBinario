import React, { useContext } from 'react'
import editorContext from '../context/editorContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const MarkdownResult = () => {
	const { markdownText } = useContext(editorContext);

	return (
			<div className="prose prose-img:mx-auto prose-h1:text-slate-800 prose-h1:text-center prose-xl p-5 w-8/12 overflow-auto text-ellipsis bg-white rounded-md h-[49rem]">
			<ReactMarkdown 
				remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>{markdownText}</ReactMarkdown>
		</div>
	)
}