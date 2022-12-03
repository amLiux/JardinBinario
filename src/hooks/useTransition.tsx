import { useRouter } from 'next/router';
import { useAuth } from '@/apollo/AuthClient';
import { useEffect, useState } from 'react';


export const useTransition = () => {
	const { asPath } = useRouter();
	const [showMessage, setShowMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	const variants = {
		inactive: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 1,
				ease: 'easeInOut'
			},
		},
		out: {
			opacity: 0,
			x: -100,
			transition: {
				duration: 1,
				ease: 'easeInOut'
			}
		},
		in: {
			x: 100,
			opacity: 0,
			transition: {
				duration: 1,
				ease: 'easeInOut'
			}
		},
	};

	const { message, removeMessage } = useAuth();

	useEffect(() => {
		if (message?.msg !== '') {
			setShowMessage(message?.msg);
		}
	}, [message]);

	useEffect(() => {
		setTimeout(() => setLoading(false), 2000);
	}, []);

	const handleClose = () => {
		setShowMessage('');
		setTimeout(() => removeMessage(), 800);
	};

	return {
		asPath,
		handleClose,
		variants,
		showMessage,
		message,
		loading,
	};

};