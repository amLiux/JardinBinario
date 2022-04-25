import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head'
import { Error } from './Error';

type LayoutProps = {
	children: ReactNode | ReactNode[];
	handleError?: (error:string) => void;
	error?: string;
	style404?: boolean;
};

export const Layout = ({ children, style404, handleError, error = '' }: LayoutProps) => {
	const [showError, setShowError] = useState<string>('');

	useEffect(() => {
		if (error !== '') {
			setShowError(error);
		}
	}, [error]);

	const handleClose = () => {
		setShowError('');
		if(handleError) setTimeout(() => handleError(''), 800);
	};

	return (
		<>
			<Head>
				<title>Jardin Binario</title>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
			</Head>
			<div className={`${style404 ? "bg-404-pattern" : "bg-slate-900"} min-h-screen flex flex-col justify-center`}>
				<div 
					className={`${showError !== '' ? "smoothRender" : ""}${showError === '' && error !== '' ? "smoothRemove" : ""}`}
				>
					{error !== '' && <Error handleClose={handleClose} error={error} />}
				</div>
				{children}
			</div>
		</>
	)
}
