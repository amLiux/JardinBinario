import { Tooltip } from '@/components/Tooltip';
import checkboxStyles from './Checkbox.module.css';

type CheckboxProps = {
	handleCheck: () => void;
	message: string;
	tooltip?: string;
	tooltipToHover?: string;
	signature?: boolean;
	id?: string;
}

export const Checkbox = ({ handleCheck, message, tooltipToHover, tooltip, signature, id = 'tos'}: CheckboxProps) => {
	return (
		<div className={`${checkboxStyles.container} ${signature ? 'mt-10 mb-6' : 'mt-3.5'}`}>
			<input onChange={handleCheck} id={id} type='checkbox' className={checkboxStyles.input} />
			<label htmlFor={id} className={`${checkboxStyles.label} ${signature ? 'text-black' : 'text-white'}`}>
				<code>
					{message}&nbsp;
					{
						tooltip && tooltipToHover && <Tooltip tooltipText={tooltip}>
							<a href='#' className={checkboxStyles.copy}>
								{tooltipToHover}
							</a>
						</Tooltip>
					}
				</code>
			</label>
		</div>
	);
};
