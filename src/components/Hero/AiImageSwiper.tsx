import React from 'react';
import { CustomSwiper } from '../Swiper';
import { Image } from '@/types/sharedTypes';
import ImageComponent from './Image';

interface AiImageSwiperProps {
    images: Image[];
    renderFromPromptComponent?:boolean;
    isMobile: boolean;
}

export const AiImageSwiper = ({ images, renderFromPromptComponent = false, isMobile}: AiImageSwiperProps) => {
    const showSwiper = images?.length >= 5;
    if (!showSwiper && !renderFromPromptComponent) return null;

    return (
        <div className='md:w-[600px]'>
            <CustomSwiper
                slidesPerView={{
                    default: 1,
                    640: 1,
                    768: 1,
                    1024: 1,
                }}
                autoplay
                requiresMarginTop={false}
            >
                {
                    images.map(
                        image =>
                            <ImageComponent
                                key={`image-${image.prompt}`}
                                prompt={image.prompt}
                                date={image.date}
                                img={image.img}
                                isMobile={isMobile}
                            />
                    )
                }
            </CustomSwiper>
        </div>
    );
};
