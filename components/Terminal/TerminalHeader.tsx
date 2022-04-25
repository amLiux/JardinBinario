import React from 'react';

type TerminalHeaderProps = {
	header:string;
}

type validColors = 'red' | 'yellow' | 'green';

export const TerminalHeader = ({header}:TerminalHeaderProps) => {
	const dotClass = (color:validColors):string => `w-7 h-7 bg-${color}-500 rounded-full mr-3 animate-pulse`;

	return (
		<div className="terminalHeader">
			<span className={dotClass('red')}></span>
			<span className={dotClass('yellow')}></span>
			<span className={dotClass('green')}></span>
			<h5 className="terminalHeader__text">
				<code> | {header}</code>
			</h5>
		</div>
	)
}
