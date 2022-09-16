import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head'
import { Message } from './Message';
import { useAuth } from '../apollo/AuthClient';

type LayoutProps = {
	children: ReactNode | ReactNode[];
	style404?: boolean;
};

export const Layout = ({ children, style404 }: LayoutProps) => {
	const [showMessage, setShowMessage] = useState<string>('');

	const { message, removeMessage } = useAuth();

	useEffect(() => {
		if (message?.msg !== '') {
			setShowMessage(message?.msg);
		}
	}, [message]);

	const handleClose = () => {
		setShowMessage('');
		setTimeout(() => removeMessage(), 800);
	};

	return (
		<>
			<Head>
				<title>Jardin Binario</title>
			</Head>
			<div className={`${style404 ? 'bg-404-pattern' : 'bg-slate-900'} smoothRender layout `}>
				<div
					className={`${showMessage !== '' ? 'smoothRender' : message !== '' ? 'smoothRemove' : ''}`}
				>
					{
						message?.msg !== '' && 
							<Message handleClose={handleClose} warning={message?.warning} error={message?.error} message={message?.msg} />
					}
				</div>
				{children}
			</div>
		</>
	)
}
