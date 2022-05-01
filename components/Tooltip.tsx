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
					<div className="text-base text-center bg-black/75 text-gray-100 absolute top rounded shadow-xl left-2 right-2 w-15">
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
