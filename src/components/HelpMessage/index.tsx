import helpMessageStyles from './HelpMessage.module.css';

type HelpMessageProps = {
  text: string;
  onClick?: () => void;
  stepper?: boolean;
};

const easterEggMessage = `
	War is peace.
	Freedom is slavery.
	Ignorance is strength.
`;

export const HelpMessage = ({
  text,
  onClick = () => console.log(easterEggMessage),
  stepper = false,
}: HelpMessageProps) => {
  return (
    <span
      onClick={onClick}
      className={`${helpMessageStyles.helpMessage} ${stepper ? 'mb-5' : ''}`}
    >
      {text}
    </span>
  );
};
