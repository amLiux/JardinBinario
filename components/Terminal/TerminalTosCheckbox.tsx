import React from 'react';
import { Tooltip } from '../Tooltip';

type TerminalTosCheckboxProps = {
	handleCheck: () => void;
}

export const TerminalTosCheckbox = ({ handleCheck }: TerminalTosCheckboxProps) => {
	return (
		<div className="flex items-center mt-3">
			<input onChange={handleCheck} id="tos" type="checkbox" className="checked:bg-purple-400 rounded-full w-5 h-5 ml-4 bg-purple-400" />
			<label htmlFor="tos" className="ml-2 text-sm font-light text-white"
			>
				<code>
					I agree to the&nbsp;
					<Tooltip tooltipText="We gather some information from your browser, device and timezone to keep our application updated.">
						<a href="#" className="text-indigo-600 hover:text-indigo-500 underline">
							Privacy Policy.
						</a>
					</Tooltip>
				</code>
			</label>
		</div>
	)
}
