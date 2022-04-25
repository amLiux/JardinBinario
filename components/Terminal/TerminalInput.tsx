import { FormikHandlers } from 'formik';
import React, { useState } from 'react';

type TerminalInputProps = {
	type: 'text' | 'password';
	label: string;
	id: string;
	value: string;
	onChange: FormikHandlers['handleChange'];
	// TODO is there a way to extend this? search
	// onBlur: FormikHandlers['handleBlur'];
	error?:string;
	// formik.touched is only modified on the handleBlur method
	// touched?:boolean;
}

export const TerminalInput = ({ label, type, id, value, onChange, error }: TerminalInputProps) => {
	const [focused, setFocused] = useState(false);
	return (
		<div className={`terminalInput ${focused ? 'terminalInput__focus' : ''} ${error ? "terminalInput__error" : ""}`}>
			<label className="terminalInput__label" htmlFor={id}>
				&gt; <code>{label}: </code>
			</label>
			<input
				onChange={onChange}
				onFocus={() => setFocused(!focused)}
				onBlur={() => setFocused(!focused)}
				id={id}
				className="terminalInput__input"
				type={type}
				value={value}
			/>
		</div>
	)
}
