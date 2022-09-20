import { FormikHandlers, } from 'formik';
import React, { ReactNode } from 'react'
import terminalFormStyles from './Form.module.css';

type FormProps = {
	children: ReactNode | ReactNode[];
	handleSubmit?: FormikHandlers['handleSubmit'];
	terminal?: boolean;
};

export const Form = ({ children, handleSubmit, terminal = false }: FormProps) => {
	return (
		<form 
			onSubmit={(e) => {e.preventDefault(); if(handleSubmit) handleSubmit(e)}}
			autoComplete="off"
			className={terminal ? terminalFormStyles.terminalForm : ''}
		>
			{children}
		</form>
	)
}