import { Icons } from '@/components/Icons';
import messageStyles from './Message.module.css';
import { Flexbox } from '../lib/Flexbox';

type MessageProps = {
	message: string;
	handleClose: () => void;
	error?: boolean;
	warning?: boolean;
	index?: boolean;
};

export const Message = ({ message, handleClose, warning = false, error = false, index = false }: MessageProps) => {
	return (
		<Flexbox
			justifyContent='space-around'
			alignItems='center'
			extraClass={`
				${messageStyles.container}
				${error ? 'bg-red-500' : warning ? 'bg-yellow-500' : 'bg-green-500'}
				${index ? 'fixed top-[4.4rem] z-[1000]' : 'absolute top-0 '}
			`}>
			<Flexbox alignItems='center' justifyContent='center'>
				<span className={messageStyles.messageType}>{error ? 'ERROR:' : 'MESSAGE:'}</span>
				<div className={messageStyles.messageBox}>
					<span className={messageStyles.message}>{message}</span>
				</div>
			</Flexbox>
			<button onClick={handleClose} className={messageStyles.messageClose}>
				{Icons.ERROR}
			</button>
		</Flexbox>
	);
};
