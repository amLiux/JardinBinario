import { FormikHandlers } from 'formik';
import React from 'react'
import ticketFormStyles from '../TicketForm.module.css';

interface InputProps {
	extraStyling: string;
	friendlyName: string;
	id: string;
	textInputAsKey: string;
	value: string;
	placeholder: string;
	handleChange: FormikHandlers['handleChange'];
	type: string;
	error?: string | string[];
};

export const Input = ({extraStyling, friendlyName, id, textInputAsKey, value, placeholder, handleChange, error, type}:InputProps) => {
	return (
		<div className={`${ticketFormStyles.textInputBox}`}>
			<label
				className={`
    				${extraStyling}
    				${ticketFormStyles.textInputLabel}
				`}
				htmlFor={id}
			>
				{friendlyName}
			</label>
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
					${ticketFormStyles.textInput}`
				}
				id={id}
				value={value}
				type={type}
				placeholder={placeholder}
			/>
		</div>
	)
}
