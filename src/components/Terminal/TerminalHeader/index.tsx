import { SyntheticEvent } from 'react';
import { NavbarOptions } from '@/components/NavbarOptions';
import { TagsInput } from '@/components/NewBlog/TagInput';
import { useHeader } from '@/hooks/useHeader';

import terminalHeaderStyles from './TerminalHeader.module.css';
import { Flexbox } from '@/components/lib/Flexbox';
import { Logo } from '@/components/Logo';

type TerminalHeaderProps = {
	header?: string;
	editor?: boolean;
	read?: boolean;
};

type validColors = 'red' | 'yellow' | 'green';

export const TerminalHeader = ({
	header,
	editor = false,
	read = false,
}: TerminalHeaderProps) => {

	const {
		showTags,
		tags,
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

	return (
		<Flexbox
			justifyContent='start'
			alignItems='center'
			extraClass={terminalHeaderStyles.terminalHeader}
		>
			{!read ? <>
				<span className={dotClass('red')}></span>
				<span className={dotClass('yellow')}></span>
				<span className={dotClass('green')}></span>
				<h5 className={`terminalHeader__text ${editor ? 'text-white' : ''}`}>
					<code className={`${editor ? 'text-base' : 'text-xs md:text-base'}`}> | {header}</code>
				</h5>
			</> : <Logo />}

			<>
				{showTags && <TagsInput selectedTags={selectedTags} tags={tags} />}
				<NavbarOptions
					editor={editor}
					setShowSneakpeak={setShowSneakpeak}
					storeMarkdown={storeMarkdown}
					setPreview={setPreview}
					setShowTags={handleTagToggle}
				/>
			</>
		</Flexbox>
	);
};
