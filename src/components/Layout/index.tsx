import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Message } from '../Message';
import { useAuth } from '../../apollo/AuthClient';
import layoutStyles from './Layout.module.css';
import { seoMapping } from '../../seo';

type LayoutProps = {
	children: ReactNode | ReactNode[];
	style404?: boolean;
	index?: boolean;
};

export const Layout = ({ children, style404, index = false }: LayoutProps) => {
	const [showMessage, setShowMessage] = useState<string>('');
	const router = useRouter();
	const seo = seoMapping[router.asPath];

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
				<title>{seo?.title}</title>
				<meta name="description" content={seo?.description} />
				<meta property="og:title" content={seo?.title} />
				<meta property="og:description" content={seo?.description} />
				{/* <meta property="og:image" content={page?.data?.image} /> */}
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={'https://jardinbinario.com' + router.asPath}
				/>
			</Head>
			<div
				className={`
					${style404 ? layoutStyles.bg404Pattern : 'bg-slate-900'}
					${layoutStyles.smoothRender}
					${layoutStyles.layout}
				`}>
				<div
					// TODO check this logic? sort of unreadable
					className={`
						${showMessage !== '' ? layoutStyles.smoothRender : message !== '' ? layoutStyles.smoothRemove : ''}
					`}
				>
					{
						message?.msg !== '' &&
						<Message index={index} handleClose={handleClose} warning={message?.warning} error={message?.error} message={message?.msg} />
					}
				</div>
				{children}
			</div>
		</>
	);
};
