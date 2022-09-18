import Image from 'next/image';
import React, { RefObject } from 'react';
import { Tooltip } from '../Tooltip';
import { services } from './services';
import servicesStyles from './Services.module.css';

interface ServicesProps {
    ref: RefObject<HTMLDivElement>;
}

export const Services = ({ ref }: ServicesProps) => {
    return (
        <div id='services' ref={ref} className={servicesStyles.container}>
            {
                services.map(({ title, description, stack }, cardIdx) =>
                    <div key={cardIdx} className={servicesStyles.card}>
                        <div className={servicesStyles.cardTextContainer}>
                            <h4>{title}</h4>
                            <span>{description}</span>
                        </div>
                        <div className={servicesStyles.logosContainer}>
                            {stack && stack.map(({ name, logo, alt }, idx) =>
                                <Tooltip
                                    size='little'
                                    key={idx}
                                    tooltipText={`#${name}`}
                                    position={cardIdx % 2 === 0 ? 'left-80' : 'right-80'}
                                >
                                    <span key={idx} className={servicesStyles.logo}>
                                        <Image src={logo} width={48} height={48} alt={alt} />
                                    </span>
                                </Tooltip>
                            )}
                        </div>
                    </div>

                )
            }
        </div>
    )
}
