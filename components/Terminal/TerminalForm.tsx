import { FormikHandlers, } from 'formik';
import React, { ReactNode } from 'react'

type TerminalFormProps = {
	children: ReactNode | ReactNode[];
	handleSubmit?: FormikHandlers['handleSubmit'];
};

export const TerminalForm = ({ children, handleSubmit }: TerminalFormProps) => {
	return (
		<form onSubmit={(e) => {e.preventDefault(); if(handleSubmit) handleSubmit(e)}} autoComplete="off" className="terminalForm">
			{children}
		</form>
	)
}