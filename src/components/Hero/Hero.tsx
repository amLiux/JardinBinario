import React from 'react';
import { Flexbox } from '../lib/Flexbox';
import heroStyles from './Hero.module.css';
import { HeroHeading } from './HeroHeading';
import { useHero } from '@/hooks/useHero';
import { Image } from '@/types/sharedTypes';
import { ApolloError } from '@apollo/client';
import { AiImageSwiper } from './AiImageSwiper';
import { AiImagePrompt } from './AiImagePrompt';
import { Spinner } from '../Spinner';

interface HeroProps {
    imagesLoading: boolean;
    imagesError: ApolloError | undefined;
    data: {
        getAllImagesOfDay: Image[];
    };
}

export const Hero = ({ imagesLoading, imagesError, data }: HeroProps) => {
    const { submitting, formik, image } = useHero();
    const images = data?.getAllImagesOfDay;
    return (
        <Flexbox alignItems='center' extraClass={heroStyles.container}>
            <HeroHeading title='Un jardín tecnológico donde las ideas florecen.' />
            <Flexbox extraClass='bg-slate-900 h-full w-[60%]' justifyContent='center' alignItems='center'>
                {
                    imagesLoading
                        ? <Spinner size='big' />
                        :
                        <>
                            <AiImageSwiper images={images} />
                            <AiImagePrompt
                                submitting={submitting}
                                formik={formik}
                                image={image}
                                renderPrompt={images?.length < 5 || false}
                            />
                        </>
                }
            </Flexbox>
        </Flexbox>
    );
};

