import React from 'react';
import { Icons } from '../Icons';
import { EditorNavbarOptions } from '../NewBlog/EditorNavbarOptions';
import { Tooltip } from '../Tooltip';

type TerminalHeaderProps = {
	header: string;
	editor?: boolean;
}

type validColors = 'red' | 'yellow' | 'green';


export const TerminalHeader = ({ header, editor = false }: TerminalHeaderProps) => {
	const dotClass = (color: validColors): string => `w-7 h-7 bg-${color}-500 rounded-full mr-3 animate-pulse`;

	return (
		<div className={`terminalHeader ${editor ? 'bg-slate-800 h-16 items-center' : ''}`}>
			<span className={dotClass('red')}></span>
			<span className={dotClass('yellow')}></span>
			<span className={dotClass('green')}></span>
			<h5 className={`terminalHeader__text ${editor ? 'text-white mr-auto' : ''}`}>
				<code> | {header}</code>
			</h5>
			{
				editor && <EditorNavbarOptions />
			}
		</div>
	)
}
