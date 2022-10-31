import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { BlogEntry, UserContext } from '@/types/sharedTypes';
import { useMarkdownResult } from '@/hooks/useMarkdownResult';

import markdownResultsStyles from './MarkdownResult.module.css';

type MarkdownRestulProps = {
	preview?: boolean;
	context?: UserContext;
	blogEntry?: BlogEntry;
};


export const MarkdownResult = ({ preview = false, context, blogEntry }: MarkdownRestulProps) => {

	const {
		toRender,
		visualMarkdown
	} = useMarkdownResult(preview, context, blogEntry);

	return (
		<div
			className={`
					${preview 
						? markdownResultsStyles.preview 
						: `${markdownResultsStyles.writing} ${markdownResultsStyles.markdownResult}`
					} 
				`}
		>
			<ReactMarkdown
				remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
				rehypePlugins={[rehypeRaw]}
			>
				{toRender || visualMarkdown}
			</ReactMarkdown>
		</div>
	);
};