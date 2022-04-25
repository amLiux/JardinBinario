import { FormikHandlers } from 'formik';
import React, { ReactNode } from 'react'

type TerminalFormProps = {
	children: ReactNode | ReactNode[];
	handleSubmit: FormikHandlers['handleSubmit'];
}

export const TerminalForm = ({ children, handleSubmit }: TerminalFormProps) => {
	return (
		<form onSubmit={handleSubmit} className="terminalForm">
			{children}
		</form>
	)
}