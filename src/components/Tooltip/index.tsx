import React, { ReactNode, useState } from 'react';
import tooltipStyles from './Tooltip.module.css';
type TooltipProps = {
	children: ReactNode | ReactNode[];
	tooltipText: string;
	size?: 'little' | 'big';
	position?: string;
	// TODO need to check how to add position prop and/or add more logic here for width, height 
};

export const Tooltip = ({ children, tooltipText, size, position}: TooltipProps) => {
	const [isShown, setIsShown] = useState(false);

	return (
		<>
			{
				isShown && (
					<div className={`${tooltipStyles.tooltip} ${size === 'little' ? 'w-fit' : ''} ${position ? position : 'inset-x-80'} `}>
						{tooltipText}
					</div>
				)
			}
			<div
				className='inline'
				onMouseEnter={() => setIsShown(true)}
				onMouseLeave={() => setIsShown(false)}
			>
				{children}
			</div>
		</>

	)
}
