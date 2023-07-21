import React from 'react';
import { CustomSwiper } from '../Swiper';
import { Image } from '@/types/sharedTypes';
import ImageComponent from './Image';

interface AiImageSwiperProps {
    images: Image[];
}

export const AiImageSwiper = ({ images }: AiImageSwiperProps) => {
    const showSwiper = images?.length >= 5;

    if (!showSwiper) return null;

    return (
        <div className='w-[600px]'>
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
                            />
                    )
                }
            </CustomSwiper>
        </div>
    );
};
