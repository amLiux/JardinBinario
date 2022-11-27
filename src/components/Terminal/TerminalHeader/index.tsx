import Image from 'next/image';
import { NextRouter } from 'next/router';
import { SyntheticEvent } from 'react';

import { IndexNavbarOptions } from '@/components/IndexNavbarOptions';
import { EditorNavbarOptions } from '@/components/NewBlog/EditorNavbarOptions';
import { TagsInput } from '@/components/NewBlog/TagInput';
import logo from '@/assets/logo.png';
import { useHeader } from '@/hooks/useHeader';

import terminalHeaderStyles from './TerminalHeader.module.css';

type TerminalHeaderProps = {
	header?: string;
	editor?: boolean;
	index?: boolean;
	read?: boolean;
	handleClickServices?: (ref: string) => void;
	router?: NextRouter;
};

type validColors = 'red' | 'yellow' | 'green';

export const TerminalHeader = ({ header, editor = false, index = false, read = false, handleClickServices, router }: TerminalHeaderProps) => {
	
	const {
		showTags,
		tags,
		completion,
		setShowTags,
		selectedTags,
		storeMarkdown,
		setPreview,
		setShowSneakpeak,
	} = useHeader();

	const handleTagToggle = (e: SyntheticEvent) => {
        const target = (e.target as HTMLInputElement);
        setShowTags((show: boolean) => !show);
        target.focus();
    };
	
	const dotClass = (color: validColors): string => `w-7 h-7 bg-${color}-500 rounded-full mr-3 animate-pulse`;

	const needsStickyHeader = index || read;

	return (
		<div
			className={`
				${terminalHeaderStyles.terminalHeader}
				${ needsStickyHeader ? 'scroll sticky top-0 p-2' : 'p-4'}
			`}>
			{
				needsStickyHeader
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
					<EditorNavbarOptions
						showSneakpeak={setShowSneakpeak}
						storeMarkdown={storeMarkdown}
						setPreview={setPreview}
						showTags={handleTagToggle} 
					/>
				</>
			}
			{
				index && handleClickServices && <IndexNavbarOptions router={router} handleClickServices={handleClickServices} />
			}
			{
				read && !!completion && <span
					style={{ transform: `translateX(${completion - 100}%)` }}
					className="transition-all ease-in-out absolute bg-purple-500 h-1 w-full bottom-0 left-0"
				/>
			}

		</div>
	);
};
