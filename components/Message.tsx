import React from 'react'
import { Icons } from './Icons';

type MessageProps = {
	message: string;
	handleClose: () => void;
	error: boolean;
};

export const Message = ({ message, error = false, handleClose }: MessageProps) => {
	return (
		<div className={`absolute top-0 transition- all w-full flex justify-around transform items-center ${error ? 'bg-red-500' : 'bg-green-500'} text-center py-1 text-white`}>
			<code className="flex items-center justify-center">
				<span className="text-white font-bold">{error ? 'ERROR:' : 'MESSAGE:'}</span>
				<div className="underline py-1 text-white px-2">
					<span className="text-sm font-extralight ">{message}</span>
				</div>
			</code>
			<button onClick={handleClose} className="rounded-full shadow-xl bg-white border border-white">
				{Icons.ERROR}
			</button>
		</div>
	)
}
