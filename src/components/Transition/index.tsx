import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTransition } from '@/hooks/useTransition';
import { Message } from '@/components/Message';
import { Layout } from '@/components/Layout';
import layoutStyles from '@/components/Layout/Layout.module.css';

interface TransitionProps {
	children: ReactNode | ReactNode[];
};

export const Transition = ({ children }: TransitionProps) => {
	const { showMessage, asPath, variants, handleClose, message } = useTransition();
	return (
		<Layout index>
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
				exitBeforeEnter
				mode='wait'
			>
				<motion.div
					key={asPath}
					variants={variants}
					initial="in"
					animate="inactive"
					exit="out"
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</Layout>
	);
};
