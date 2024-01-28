import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTransition } from '@/hooks/useTransition';
import { Message } from '@/components/Message';
import layoutStyles from '@/components/Layout/Layout.module.css';
import { LoadingSplash } from '../LoadingSplash';
import { Flexbox } from '../lib/Flexbox';

interface TransitionProps {
	children: ReactNode | ReactNode[];
	isReadPage: boolean;
};

export const Transition = ({ children, isReadPage }: TransitionProps) => {
	const {
		showMessage,
		asPath,
		variants,
		handleClose,
		message,
		loading
	} = useTransition();

	return (
		<Flexbox
			extraClass={`
				min-h-screen
				bg-slate-900
			`}
			justifyContent='center'
			flexDirection='column'
		>
			<div
				// TODO check this logic? sort of unreadable
				className={`
						${showMessage !== ''
						? layoutStyles.smoothRender
						: message !== ''
							? layoutStyles.smoothRemove
							: ''
					}
					`}
			>
				{
					message?.msg !== '' &&
					<Message index={asPath === '/'} handleClose={handleClose} warning={message?.warning} error={message?.error} message={message?.msg} />
				}
			</div>
			<AnimatePresence
				initial={false}
				mode='wait'
			>
				<motion.div
					key={asPath}
					variants={variants}
					initial="in"
					animate="inactive"
					exit="out"
				>
					{isReadPage && children }
					{ loading && !isReadPage ? <LoadingSplash/> : children }
				</motion.div>
			</AnimatePresence>
		</Flexbox>
	);
};
