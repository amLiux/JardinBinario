import { Tooltip } from '../Tooltip';
import checkboxStyles from './Checkbox.module.css';

type CheckboxProps = {
	handleCheck: () => void;
	message: string;
	tooltip: string;
	tooltipToHover: string;
}

export const Checkbox = ({ handleCheck, message, tooltipToHover, tooltip}: CheckboxProps) => {
	return (
		<div className={checkboxStyles.container}>
			<input onChange={handleCheck} id='tos' type='checkbox' className={checkboxStyles.input} />
			<label htmlFor='tos' className={checkboxStyles.label}>
				<code>
					{message}&nbsp;
					<Tooltip tooltipText={tooltip}>
						<a href='#' className={checkboxStyles.copy}>
							{tooltipToHover}
						</a>
					</Tooltip>
				</code>
			</label>
		</div>
	);
};
