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
	newsletter?: boolean;
};

export const Input = ({ extraStyling, friendlyName, id, textInputAsKey, value, placeholder, handleChange, error, type, newsletter = false }: InputProps) => {
	return (
		<div className={`${ticketFormStyles.textInputBox} ${newsletter ? ticketFormStyles.newsletterInput : ''}`}>
			{
				!newsletter && <label
					className={`
						${extraStyling}
						${ticketFormStyles.textInputLabel}
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
					${ticketFormStyles.textInput}`
				}
				id={id}
				value={value}
				type={type}
				placeholder={placeholder}
			/>
			{
				// disabled={disabledButton}
				// {submitting ? <Spinner></Spinner> : 'Enviar'}
				newsletter &&
				<button type='submit' className={`
					${ticketFormStyles.submitButton}
					${ticketFormStyles.submitButtonNewsletter} 
				`}>
					Suscríbete
				</button>
			}
		</div>
	)
}
