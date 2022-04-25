import React, { ReactNode } from 'react';

type TerminalProps =  {
	children: ReactNode | ReactNode[];
}

export const Terminal = ({children}:TerminalProps) => {
	return (
		<div className="terminal">
			{children}
		</div>
	)
}
