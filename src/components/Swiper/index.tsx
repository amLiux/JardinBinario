import { ReactNode } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import customSwiperStyles from './CustomSwiper.module.css';
import ticketFormStyles from '../TicketForm/TicketForm.module.css';
import { AutoplayOptions, SwiperModule } from 'swiper/types';

type amountOfSlides = 1 | 2;
interface CustomSwiperProps {
    children: ReactNode | ReactNode[];
    title?: string;
    slidesPerView: {
        default: amountOfSlides;
        640: amountOfSlides;
        768: amountOfSlides;
        1024: amountOfSlides;
    };
    autoplay: boolean;
    // backward compatibility 
    requiresMarginTop?: boolean;
}

type SharedProps = {
    autoplay?: AutoplayOptions;
    modules?: SwiperModule[];
};

export const CustomSwiper = ({ children, title, slidesPerView, autoplay, requiresMarginTop = true }: CustomSwiperProps) => {
    const wrapper = Array.isArray(children) ? children : [children];
    let sharedProps: SharedProps = {};
    if (autoplay) {
        sharedProps.autoplay = {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        };
        sharedProps.modules = [Autoplay];
    }
    return (
        <div className={requiresMarginTop ? customSwiperStyles.container : undefined}>
            {
                title && <span className={ticketFormStyles.coolHeading} >
                    <h3>{title}</h3>
                </span> 
            }
            <div className={customSwiperStyles.swiperContainer}>
                <Swiper
                    {...sharedProps}
                    effect='fade'
                    // This avoids Swiper duplicating blogs when there is only one blog
                    loop={wrapper.length > 1}
                    breakpoints={{
                        640: {
                            slidesPerView: slidesPerView[640],
                            spaceBetween: 32,
                        },
                        768: {
                            slidesPerView: slidesPerView[768],
                            spaceBetween: 32,
                        },
                        1024: {
                            slidesPerView: slidesPerView[1024],
                            spaceBetween: 32,
                        },
                    }}
                    slidesPerView={slidesPerView.default}
                >
                    {
                        wrapper.map((children, idx) =>
                            <SwiperSlide
                                className={customSwiperStyles.swiperSlide}
                                key={idx}
                            >
                                {children}
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </div>
    );
};
