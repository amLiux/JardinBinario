import React from 'react'
import { Icons } from './Icons';

type ErrorProps = {
	error: string;
	handleClose: () => void;
};

export const Error = ({error, handleClose}:ErrorProps) => {
	return (
		<div className="absolute top-0 transition- all w-full flex justify-around transform items-center bg-red-500 text-center py-1 text-white">
		<code className="flex items-center justify-center">
			<span className="text-white font-bold">ERROR:</span>
			<div className="underline py-1 text-white px-2">
				<span className="text-sm font-extralight ">{error}</span>
			</div>
		</code>
		<button onClick={handleClose} className="rounded-full shadow-xl bg-white border border-white">
			{Icons.ERROR}
		</button>
	</div>
	)
}
