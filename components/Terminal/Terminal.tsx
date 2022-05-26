import React, { ReactNode } from 'react';

type TerminalProps =  {
	children: ReactNode | ReactNode[];
	read?: boolean;
}

export const Terminal = ({children, read=false}:TerminalProps) => {
	return (
		<div className={`terminal ${read ? 'read prose-blockquote:bg-slate-900 prose-pre:text-purple-200 prose-pre:bg-slate-900' : 'max-w-md'}`}>
			{children}
		</div>
	)
}
