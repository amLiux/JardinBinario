import React from 'react'
import { Icons } from '../../Icons';
import terminalButtonStyles from './TerminalButton.module.css';

type TerminalButtonProps = {
	text: string;
	disabled?: boolean;
}

export const TerminalButton = ({ text, disabled }: TerminalButtonProps) => {
	const IconIndex = text.replace(/ /g, "").toUpperCase();
	return (
		<button disabled={disabled} type="submit" className={terminalButtonStyles.terminalButton}>
			<code>
				{text}
			</code>
			{Icons?.[IconIndex]}
		</button>
	)
}
