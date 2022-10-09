import Image from 'next/image';
import { NextRouter } from 'next/router';

import { IndexNavbarOptions } from '../../IndexNavbarOptions';
import { EditorNavbarOptions } from '../../NewBlog/EditorNavbarOptions';
import { TagsInput } from '../../NewBlog/TagInput';
import terminalHeaderStyles from './TerminalHeader.module.css';
import logo from '../../../public/logo.png';
import { useHeader } from '../../../hooks/useHeader';

type TerminalHeaderProps = {
	header?: string;
	editor?: boolean;
	index?: boolean;
	read?: boolean;
	handleClickServices?: (ref: string) => void;
	router?: NextRouter;
}


export const TerminalHeader = ({ header, editor = false, index = false, read = false, handleClickServices, router }: TerminalHeaderProps) => {
	
	const {
		dotClass,
		showTags,
		setShowTags,
		tags,
		selectedTags,
		storeMarkdown,
		setPreview,
		completion
	} = useHeader();

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
					<EditorNavbarOptions storeMarkdown={storeMarkdown} setPreview={setPreview} showTags={setShowTags} />
				</>
			}
			{
				index && <IndexNavbarOptions router={router} handleClickServices={handleClickServices} />
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
