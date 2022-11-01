import Image from 'next/image';
import { RefObject } from 'react';
import { Tooltip } from '@/components/Tooltip';
import { services } from './services';
import servicesStyles from './Services.module.css';

interface ServicesProps {
    refForScroll: RefObject<HTMLDivElement>;
}

export const Services = ({ refForScroll }: ServicesProps) => {
    return (
        <>
            <h3>Nuestros servicios: </h3>
            <div id='services' ref={refForScroll} className={servicesStyles.container}>
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
        </>
    );
};
