import React, { useContext, useState } from 'react';
import editorContext from '../context/editorContext';
import { EditorNavbarOptions } from '../NewBlog/EditorNavbarOptions';
import { TagsInput } from '../NewBlog/TagInput';

type TerminalHeaderProps = {
	header: string;
	editor?: boolean;
}

type validColors = 'red' | 'yellow' | 'green';


export const TerminalHeader = ({ header, editor = false }: TerminalHeaderProps) => {
	const { tags, setTags, setPreview } = useContext(editorContext);

	const dotClass = (color: validColors): string => `w-7 h-7 bg-${color}-500 rounded-full mr-3 animate-pulse`;
	const [showTags, setShowTags] = useState<boolean>(false);
	const selectedTags = (tags: string[]) => {
		setTags('tags', tags);
	};
	return (
		<div className={`terminalHeader ${editor ? 'bg-slate-800 h-16 items-center' : ''}`}>
			<span className={dotClass('red')}></span>
			<span className={dotClass('yellow')}></span>
			<span className={dotClass('green')}></span>
			<h5 className={`terminalHeader__text ${editor ? 'text-white' : ''}`}>
				<code className={`${editor ? 'text-base' : ''}`}> | {header}</code>
			</h5>
			{
				editor && <>
					{showTags && <TagsInput selectedTags={selectedTags} tags={tags} />}
					<EditorNavbarOptions setPreview={setPreview} showTags={setShowTags} />
				</>
			}
		</div>
	)
}
