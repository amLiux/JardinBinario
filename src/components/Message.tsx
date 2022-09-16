import React from 'react'
import { Icons } from './Icons';

type MessageProps = {
	message: string;
	handleClose: () => void;
	error?: boolean;
	warning?: boolean;
};

export const Message = ({ message, handleClose, warning = false, error = false }: MessageProps) => {
	return (
		<div className={`message ${error ? 'bg-red-500' : warning ? 'bg-yellow-500' : 'bg-green-500'}`}>
			<code className="flex items-center justify-center">
				<span className="text-white font-bold">{error ? 'ERROR:' : 'MESSAGE:'}</span>
				<div className="underline py-1 text-white px-2">
					<span className="text-sm font-extralight ">{message}</span>
				</div>
			</code>
			<button onClick={handleClose} className="message-close">
				{Icons.ERROR}
			</button>
		</div>
	)
}
