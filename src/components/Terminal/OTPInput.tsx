import { FormikHelpers } from 'formik';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { ForgotPasswordValues } from '../types/sharedTypes';

type OTPInputProps = {
	length: number;
	setFormikOtp: FormikHelpers<ForgotPasswordValues>['setFieldValue'];
	error?: string;
};

export const OTPInput = ({ length, setFormikOtp }: OTPInputProps) => {
	const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

	const handleOTPChange = (e: SyntheticEvent, ind: number) => {
		const nextNode = (e.currentTarget.nextElementSibling as HTMLElement);
		const target = (e.target as HTMLInputElement);
		setOtp([...otp.map((value, valueIndex) => (valueIndex === ind) ? target.value : value)]);
		if (nextNode && target.value !== '') {
			nextNode.focus();
		}
	}

	useEffect(() => {
		if (otp.join('').trim().length === length) {
			setFormikOtp('otp', otp.join('')); 
		}
	}, [otp, length, setFormikOtp]);

	return (
		<div className="flex align-middle justify-center">
			{
				otp.map(
					(input, ind) => <input
							className="bg-slate-800 border-purple-400 border text-center focus:border-2  focus:animate-pulse w-8 text-white focus:outline-none focus:bg-slate-600 shadow-xl rounded-md h-10 m-1 text-sm"
							value={input}
							key={ind}
							maxLength={1}
							onChange={(e: SyntheticEvent) => { handleOTPChange(e, ind) }}
						/>
				)
			}
		</div>
	)
}
