import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head'
import { Message } from '../Message';
import { useAuth } from '../../apollo/AuthClient';
import layoutStyles from './Layout.module.css';

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
				{/* TODO Helmet or find a way to add title, og, images, etc... */}
				<title>Jardin Binario</title>
			</Head>
			<div 
				className={`
					${style404 ? layoutStyles.bg404Pattern : 'bg-slate-900'}
					${layoutStyles.smoothRenderer}
					${layoutStyles.layout}
				`}>
				<div
					// TODO check this logic? sort of unreadable
					className={`
						${showMessage !== '' ? layoutStyles.smoothRenderer : message !== '' ? layoutStyles.smoothRemove : ''}
					`}
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
