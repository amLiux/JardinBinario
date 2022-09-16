import React from 'react';
import { Tooltip } from '../../Tooltip';
import terminalTosCheckboxStyles from './TerminalTosCheckbox.module.css';

type TerminalTosCheckboxProps = {
	handleCheck: () => void;
}

export const TerminalTosCheckbox = ({ handleCheck }: TerminalTosCheckboxProps) => {
	return (
		<div className={terminalTosCheckboxStyles.container}>
			<input onChange={handleCheck} id="tos" type="checkbox" className={terminalTosCheckboxStyles.input} />
			<label htmlFor="tos" className={terminalTosCheckboxStyles.label}>
				<code>
					I agree to the&nbsp;
					<Tooltip tooltipText="We gather some information from your browser, device and timezone to keep our application updated.">
						<a href="#" className={terminalTosCheckboxStyles.copy}>
							Privacy Policy.
						</a>
					</Tooltip>
				</code>
			</label>
		</div>
	)
}
