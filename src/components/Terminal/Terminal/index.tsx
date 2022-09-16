import React, { ReactNode } from 'react';
import terminalStyles from './Terminal.module.css';

type TerminalProps =  {
	children: ReactNode | ReactNode[];
	read?: boolean;
}

export const Terminal = ({children, read=false}:TerminalProps) => {
	return (
		<div className={`${terminalStyles.terminal} ${read ? terminalStyles.read : 'max-w-md'}`}>
			{children}
		</div>
	)
}
