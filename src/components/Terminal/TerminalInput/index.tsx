import { FormikHandlers } from 'formik';
import { useState } from 'react';
import terminalInputStyles from './TerminalInput.module.css';

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
		<div className={`
			${terminalInputStyles.terminalInput} 
			${focused ? terminalInputStyles.focus : ''} 
			${error ? terminalInputStyles.error : ''}`
			}>
			<label className={terminalInputStyles.label} htmlFor={id}>
				&gt; <code>{label}: </code>
			</label>
			<input
				onChange={onChange}
				onFocus={() => setFocused(!focused)}
				onBlur={() => setFocused(!focused)}
				id={id}
				className={terminalInputStyles.input}
				type={type}
				value={value}
			/>
		</div>
	);
};
