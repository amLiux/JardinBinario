import { FormikHelpers } from 'formik';
import { SyntheticEvent, useEffect, useState } from 'react';
import { ForgotPasswordValues } from '@/types/sharedTypes';
import otpInputStyles from './OTPInput.module.css';

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
	};

	useEffect(() => {
		if (otp.join('').trim().length === length) {
			setFormikOtp('otp', otp.join('')); 
		}
	}, [otp, length, setFormikOtp]);

	return (
		<div className={otpInputStyles.container}>
			{
				otp.map(
					(input, ind) => <input
							className={otpInputStyles.otpInput}
							value={input}
							key={ind}
							maxLength={1}
							onChange={(e: SyntheticEvent) => { handleOTPChange(e, ind); }}
						/>
				)
			}
		</div>
	);
};
