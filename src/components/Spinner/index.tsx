import React from 'react';
import spinnerStyles from './Spinner.module.css';

export const Spinner = ({ size }: any) => {
	const getSpinnerSize = (size:string) => spinnerStyles?.[size] ? spinnerStyles[size] : '';
	return (<div className={`${spinnerStyles.spinner} ${getSpinnerSize(size)}`}></div>);
};
