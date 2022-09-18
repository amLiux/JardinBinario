import React from 'react';
import spinnerStyles from './Spinner.module.css';

export const Spinner = ({ size }: any) => {
	const getSpinnerSize = (size:string) => {
		const propToCheck = `spinner-${size}`
		return spinnerStyles?.[propToCheck] ? spinnerStyles[propToCheck] : ''
	};
	return (<div className={`${spinnerStyles.spinner} ${getSpinnerSize(size)}`}></div>);
};
