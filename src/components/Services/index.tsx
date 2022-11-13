import Image from 'next/image';
import { RefObject } from 'react';
import { CustomSwiper } from '@/components/Swiper';
import { services } from './services';
import servicesStyles from './Services.module.css';

interface ServicesProps {
    refForScroll: RefObject<HTMLDivElement>;
}

export const Services = ({ refForScroll }: ServicesProps) => {
    return (
        <div id='services' ref={refForScroll}>
            <CustomSwiper
                title="Nuestros servicios:"
                slidesPerView={{
                    default: 2,
                    640: 1,
                    768: 1,
                    1024: 2,
                }}
                autoplay
            >
                {
                    services.map(({ title, description, stack }, cardIdx) =>
                        <div key={cardIdx} className={servicesStyles.card}>
                            <div className={servicesStyles.cardTextContainer}>
                                <h4>{title}</h4>
                                <span>{description}</span>
                            </div>
                            <div className={servicesStyles.logosContainer}>
                                {stack && stack.map(({ logo, alt }, idx) =>
                                    // TODO shall we keep stacks? or we add something different?
                                    <span key={idx} className={servicesStyles.logo}>
                                        <Image src={logo} width={48} height={48} alt={alt} />
                                    </span>
                                )}
                            </div>
                        </div>

                    )
                }
            </CustomSwiper>
        </div>

    );
};
