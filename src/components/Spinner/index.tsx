import React from 'react';
import spinnerStyles from './Spinner.module.css';

export const Spinner = ({ size, submitted = false}: any) => {
	const getSpinnerSize = (size:string) => {
		const propToCheck = `spinner-${size}`
		return spinnerStyles?.[propToCheck] ? spinnerStyles[propToCheck] : ''
	};

	return (
		<div className={`${spinnerStyles.spinner} ${submitted ? spinnerStyles.loadComplete : ''} ${getSpinnerSize(size)}`}>
			{submitted && <div 
				className={`
					${spinnerStyles.checkmark}
					${spinnerStyles.draw}
				`}
				></div>
			}
		</div>
	);
};
