import React from 'react';
import { Form } from '../Form';
import { Input } from '../TicketForm/Input';
import heroStyles from './Hero.module.css';
import ImageComponent from './Image';
import { Spinner } from '../Spinner';

export const AiImagePrompt = ({ formik, image, renderPrompt, submitting }: any) => {
    if (!renderPrompt) {
        return null;
    }

    if (image) {
        return <ImageComponent {...image} />;
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

