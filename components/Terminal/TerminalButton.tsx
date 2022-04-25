import React from 'react'
import { Icons } from '../Icons';

type TerminalButtonProps = {
	text: string;
	disabled?: boolean;
}

export const TerminalButton = ({ text, disabled }: TerminalButtonProps) => {
	const IconIndex = text.replace(/ /g, "").toUpperCase();
	return (
		<button disabled={disabled} type="submit" className="terminalButton">
			<code>
				{text}
			</code>
			{Icons?.[IconIndex]}
		</button>
	)
}
