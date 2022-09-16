import React from 'react'

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
		<span onClick={onClick} className="block mt-4 text-light text-md text-center italic hover:underline hover:underline-offset-2">
			{text}
		</span>
	)
}
