import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { NextRouter } from 'next/router';

import editorContext from '../../../context/editorContext';
import { IndexNavbarOptions } from '../../IndexNavbarOptions';
import { EditorNavbarOptions } from '../../NewBlog/EditorNavbarOptions';
import { TagsInput } from '../../NewBlog/TagInput';
import terminalHeaderStyles from './TerminalHeader.module.css';
import logo from '../../../public/logo.png';

type TerminalHeaderProps = {
	header?: string;
	editor?: boolean;
	index?: boolean;
	read?: boolean;
	handleClickServices?: (ref: string) => void;
	router?: NextRouter;
}

type validColors = 'red' | 'yellow' | 'green';

export const TerminalHeader = ({ header, editor = false, index = false, read = false, handleClickServices, router }: TerminalHeaderProps) => {
	const { tags, setTags, setPreview, storeMarkdown } = useContext(editorContext);
	
	const [completion, setCompletion] = useState<number>(0);
	// const [width, setWidth] = useState<number>(0);
	const dotClass = (color: validColors): string => `w-7 h-7 bg-${color}-500 rounded-full mr-3 animate-pulse`;
	const [showTags, setShowTags] = useState<boolean>(false);
	const selectedTags = (tags: string[]) => {
		setTags('tags', tags);
	};

	useEffect(() => {
		// function handleResize() {
		// 	setWidth(window.innerWidth);
		// }

		// window.addEventListener('resize', handleResize);
		// handleResize();

		window.addEventListener('scroll', handleScroll as any);
		return () => {
			window.removeEventListener('scroll', handleScroll as any);
			// window.removeEventListener('resize', handleResize);
		};
	});

	// const truncatedText = (text: string): string => {
	// 	const truncateText = (toTruncate: string, toRemove: number): string =>
	// 	  `${toTruncate.substring(0, toRemove)}...`
	// 	if (width < parseInt(theme.breakpoints.smallMobile.replace('px', '')))
	// 	  return truncateText(text, 60)
	// 	if (width < parseInt(theme.breakpoints.mobile.replace('px', '')))
	// 	  return truncateText(text, 130)
	// 	return text
	//   }

	const handleScroll = (e: SyntheticEvent) => {
		const header = document.querySelector('.scroll');
		const currentProgress = window.scrollY;
		currentProgress >= 70 ? header?.classList.add('isSticky') : header?.classList.remove('isSticky');
		const scrollHeight = document.body.scrollHeight - window.innerHeight;
		setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
	};

	return (
		<div
			className={`
				${terminalHeaderStyles.terminalHeader}
				${index || read ? 'scroll sticky top-0 p-2' : 'p-4'}
			`}>
			{
				index || read
					?
					<div
						onClick={() => router?.push('/')}
						className={terminalHeaderStyles.logoContainer}
					>
						<Image src={logo} alt='Jardin Binario logo' layout='responsive' />
					</div>
					:
					<>
						<span className={dotClass('red')}></span>
						<span className={dotClass('yellow')}></span>
						<span className={dotClass('green')}></span>
						<h5 className={`terminalHeader__text ${editor || index ? 'text-white' : ''}`}>
							<code className={`${editor ? 'text-base' : 'text-xs md:text-base'}`}> | {header}</code>
						</h5>
					</>
			}

			{
				editor && <>
					{showTags && <TagsInput selectedTags={selectedTags} tags={tags} />}
					<EditorNavbarOptions storeMarkdown={storeMarkdown} setPreview={setPreview} showTags={setShowTags} />
				</>
			}
			{
				index && !editor && <IndexNavbarOptions handleClickServices={handleClickServices} />
			}
			{
				read && <span
					style={{ transform: `translateX(${completion - 100}%)` }}
					className="transition-all ease-in-out absolute bg-purple-500 h-1 w-full bottom-0 left-0"
				/>
			}

		</div>
	);
};
