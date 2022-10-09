import helpMessageStyles from './HelpMessage.module.css';

type HelpMessageProps = {
	text: string;
	onClick?: () => void;
};

const easterEggMessage = `
	War is peace.
	Freedom is slavery.
	Ignorance is strength.
`;

export const HelpMessage = ({ text, onClick = () => console.log(easterEggMessage) }: HelpMessageProps) => {
	return (
		<span onClick={onClick} className={helpMessageStyles.helpMessage}>
			{text}
		</span>
	);
};
