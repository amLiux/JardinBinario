import React, { ReactNode, useState } from 'react';

type TooltipProps = {
	children: ReactNode | ReactNode[];
	tooltipText: string;

	// TODO need to check how to add position prop and/or add more logic here for width, height 
};

export const Tooltip = ({ children, tooltipText }: TooltipProps) => {
	const [isShown, setIsShown] = useState(false);

	return (
		<>
			{
				isShown && (
					<div className="text-lg font-mono text-center bg-black/75 text-gray-100 absolute bottom-90 inset-x-80 rounded shadow-xl p-4 w-15">
						{tooltipText}
					</div>
				)
			}
			<div
				className="inline"
				onMouseEnter={() => setIsShown(true)}
				onMouseLeave={() => setIsShown(false)}
			>
				{children}
			</div>
		</>

	)
}
