import React from 'react'
import { Icons } from '../Icons';
import messageStyles from './Message.module.css';

type MessageProps = {
	message: string;
	handleClose: () => void;
	error?: boolean;
	warning?: boolean;
};

export const Message = ({ message, handleClose, warning = false, error = false }: MessageProps) => {
	return (
		<div 
			className={`
				${messageStyles.container}
				${error ? 'bg-red-500' : warning ? 'bg-yellow-500' : 'bg-green-500'}
			`}>
			<code className={messageStyles.messageContainer}>
				<span className={messageStyles.messageType}>{error ? 'ERROR:' : 'MESSAGE:'}</span>
				<div className={messageStyles.messageBox}>
					<span className={messageStyles.message}>{message}</span>
				</div>
			</code>
			<button onClick={handleClose} className={messageStyles.messageClose}>
				{Icons.ERROR}
			</button>
		</div>
	)
}
