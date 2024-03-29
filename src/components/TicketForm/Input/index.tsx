import { FormikHandlers } from 'formik';
import ticketFormStyles from '../TicketForm.module.css';

interface InputProps {
	id: string;
	value: string;
	placeholder: string;
	handleChange: FormikHandlers['handleChange'];
	type: string;
	error?: string | string[];
	newsletter?: boolean;
	textInputAsKey?: string;
	extraLabelStyling?: string;
	friendlyName?: string;
	extraInputStyling?: string;
};

export const Input = ({ extraLabelStyling, friendlyName, id, textInputAsKey, value, placeholder, handleChange, error, type, extraInputStyling, newsletter = false }: InputProps) => {
	return (
		<div className={`${ticketFormStyles.textInputBox} ${newsletter ? ticketFormStyles.newsletterInput : ''}`}>
			{
				!newsletter && <label
					className={`
						${ticketFormStyles.textInputLabel}
						${extraLabelStyling}
					`}
					htmlFor={id}
				>
					{friendlyName}
				</label>
			}
			<input
				onChange={(e) => {
					const isPhoneNumber = textInputAsKey === 'phoneNumber';
					const inputValue = e.target.value.length;
					const isLengthyEnough = inputValue === 4;
					isPhoneNumber && isLengthyEnough && inputValue > value.length ? e.target.value = e.target.value + '-' : '';
					handleChange(e);
				}}
				maxLength={textInputAsKey === 'phoneNumber' ? 9 : undefined}
				className={`
					${error ? 'ring-2 ring-red-500 focus:ring-2 focus:border-purple-500' : ''}
					${ticketFormStyles.textInput}
					${extraInputStyling}
					`
				}
				id={id}
				value={value}
				type={type}
				placeholder={placeholder}
			/>
		</div>
	);
};
