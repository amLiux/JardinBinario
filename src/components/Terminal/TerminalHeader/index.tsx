import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import editorContext from '../../../context/editorContext';
import { IndexNavbarOptions } from '../../IndexNavbarOptions';
import { EditorNavbarOptions } from '../../NewBlog/EditorNavbarOptions';
import { TagsInput } from '../../NewBlog/TagInput';
import terminalHeaderStyles from './TerminalHeader.module.css';

type TerminalHeaderProps = {
	header: string;
	editor?: boolean;
	index?: boolean;
	handleClickServices?: (ref:string) => void;
}

type validColors = 'red' | 'yellow' | 'green';

export const TerminalHeader = ({ header, editor = false, index = false, handleClickServices }: TerminalHeaderProps) => {
	const { tags, setTags, setPreview, storeMarkdown } = useContext(editorContext);

	const dotClass = (color: validColors): string => `w-7 h-7 bg-${color}-500 rounded-full mr-3 animate-pulse`;
	const [showTags, setShowTags] = useState<boolean>(false);
	const selectedTags = (tags: string[]) => {
		setTags('tags', tags);
	};

	// Sticky Menu Area
	useEffect(() => {
		window.addEventListener('scroll', isSticky as any);
		return () => {
			window.removeEventListener('scroll', isSticky as any);
		};
	});


	/* Method that will fix header after a specific scrollable */
	const isSticky = (e:SyntheticEvent) => {
		const header = document.querySelector('.scroll');
		const scrollTop = window.scrollY;
		scrollTop >= 100 ? header?.classList.add('isSticky') : header?.classList.remove('isSticky');
	};

	return (
		<div
			className={`
				${terminalHeaderStyles.terminalHeader}
				${editor ? 'bg-slate-800 h-16 items-center' : ''}
				${index ? `scroll sticky top-0` : ''}
			`}>
			<span className={dotClass('red')}></span>
			<span className={dotClass('yellow')}></span>
			<span className={dotClass('green')}></span>
			<h5 className={`terminalHeader__text ${editor || index ? 'text-white' : ''}`}>
				<code className={`${editor ? 'text-base' : ''}`}> | {header}</code>
			</h5>
			{
				editor && <>
					{showTags && <TagsInput selectedTags={selectedTags} tags={tags} />}
					<EditorNavbarOptions storeMarkdown={storeMarkdown} setPreview={setPreview} showTags={setShowTags} />
				</>
			}
			{
				index && <IndexNavbarOptions handleClickServices={handleClickServices} />
			}
		</div>
	)
}
