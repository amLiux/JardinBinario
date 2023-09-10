import React from 'react';
import { Form } from '../Form';
import { Input } from '../TicketForm/Input';
import heroStyles from './Hero.module.css';
import { Spinner } from '../Spinner';
import { FormikProps } from 'formik';
import { BasicObject, Image } from '@/types/sharedTypes';
import { AiImageSwiper } from './AiImageSwiper';

interface AiImagePromptProps {
    formik: FormikProps<BasicObject>;
    image: Image;
    renderPrompt: boolean;
    submitting: FormikProps<BasicObject>['isSubmitting'];
    images: Image[];
    isMobile: boolean;
}

export const AiImagePrompt = ({ formik, image, renderPrompt, submitting, images, isMobile }: AiImagePromptProps) => {
    const localStorageItem = window.localStorage.getItem('aiImage');
    const userLocalStorage = localStorageItem ? JSON.parse(localStorageItem) : undefined;

    if (
        images?.some(
            image => 
                image.prompt === userLocalStorage?.prompt || 
                new Date(image.date).toDateString() === new Date(userLocalStorage?.date).toDateString()
        )
    ) {
        return <AiImageSwiper isMobile={isMobile} renderFromPromptComponent images={images} />;
    }

    if (image.prompt !== '') {
        return <AiImageSwiper isMobile={isMobile} renderFromPromptComponent images={[image, ...images]} />;
    }

    if (!renderPrompt) {
        return null;
    }



    if (submitting) {
        return <Spinner size='big' />;
    }

    return (
        <Form>
            <Input
                error={formik.errors.prompt}
                friendlyName='AI Prompt'
                extraInputStyling={heroStyles.aiPrompt}
                extraLabelStyling={heroStyles.aiPromptLabel}
                id='prompt'
                placeholder='Escribe algo para generar una imagen'
                handleChange={formik.handleChange}
                value={formik.values.prompt}
                type='text'
            />
        </Form>
    );
};

