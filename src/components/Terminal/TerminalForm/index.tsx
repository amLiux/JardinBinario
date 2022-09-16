import { FormikHandlers, } from 'formik';
import React, { ReactNode } from 'react'
import terminalFormStyles from './TerminalForm.module.css';

type TerminalFormProps = {
	children: ReactNode | ReactNode[];
	handleSubmit?: FormikHandlers['handleSubmit'];
};

export const TerminalForm = ({ children, handleSubmit }: TerminalFormProps) => {
	return (
		<form 
			onSubmit={(e) => {e.preventDefault(); if(handleSubmit) handleSubmit(e)}}
			autoComplete="off"
			className={terminalFormStyles.terminalForm}
		>
			{children}
		</form>
	)
}