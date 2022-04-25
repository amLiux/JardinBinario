import React from 'react'

type HelpMessageProps = {
	text: string;
};

export const HelpMessage = ({text}:HelpMessageProps) => {
	return (
		<span className="block mt-4 text-light text-xs text-center italic hover:underline hover:underline-offset-2">
			{text}
		</span>
	)
}
