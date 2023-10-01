import { RefObject } from 'react';
import { FormikProps } from 'formik';

import { texts } from '@/components/Index/text';
import indexStyles from '@/components/Index/Index.module.css';
import { PhotoComposition } from '@/components/PhotoComposition';
import { Ideas } from '@/components/Ideas';
import { TicketForm } from '@/components/TicketForm';
import { Newsletter } from '@/components/Newsletter';
import { HeadingBlock } from '@/components/Index/HeadingBlock';
import { Blogs } from '@/components/Blogs';
import { BlogEntry, Image, NewsletterValues, NewTicketValues } from '@/types/sharedTypes';
import { Hero } from '@/components/Hero/Hero';
import { ApolloError } from '@apollo/client';

export interface IndexScreenProps {
    recentEntries: BlogEntry[];
    mostViewedEntries: BlogEntry[];
    disableButton: {
        [key: string]: boolean;
    };
    formikContactForm: FormikProps<NewTicketValues>;
    formikNewsletter: FormikProps<NewsletterValues>;
    refServices: RefObject<HTMLDivElement>;
    refForm: RefObject<HTMLDivElement>;
    submitted: {
        [key: string]: boolean;
    };
    message: string;
    imagesLoading: boolean;
    imagesError: ApolloError | undefined;
    images: {
        getAllImagesOfDay: Image[];
    };
};

export const IndexScreen = ({
    recentEntries,
    mostViewedEntries,
    formikContactForm,
    refForm, refServices,
    formikNewsletter,
    disableButton,
    submitted,
    message,
    imagesLoading,
    imagesError,
    images,
}: IndexScreenProps) => {

    return (
        <>
            <Hero imagesLoading={imagesLoading} imagesError={imagesError} data={images} />
            <div className={indexStyles.index}>
                <HeadingBlock
                    subheadingAnimationDirection='Right'
                    headingAnimationDirection='Left'
                    tag='h1'
                    block={texts.introBlock}
                />
                <PhotoComposition />
                <HeadingBlock
                    headingAnimationDirection='Right'
                    subheadingAnimationDirection='Left'
                    tag='h2'
                    block={texts.descriptionBlock}
                />
                <Ideas refForScroll={refServices} />
                <HeadingBlock
                    headingAnimationDirection='Right'
                    subheadingAnimationDirection='Left'
                    tag='h3'
                    block={texts.disclaimerBlock}
                />
                <TicketForm
                    handleChange={formikContactForm.handleChange}
                    errors={formikContactForm.errors}
                    values={formikContactForm.values}
                    handleSubmit={formikContactForm.handleSubmit}
                    setServices={formikContactForm.setFieldValue}
                    disabledButton={disableButton.contactForm}
                    submitting={formikContactForm.isSubmitting}
                    submitted={submitted.contactForm}
                    message={message}
                    refForForm={refForm}
                />
                <Newsletter
                    handleSubmit={formikNewsletter.handleSubmit}
                    handleChange={formikNewsletter.handleChange}
                    submitting={formikNewsletter.isSubmitting}
                    values={formikNewsletter.values}
                    errors={formikNewsletter.errors}
                    disabledButton={disableButton.newsletterForm}
                    submitted={submitted.newsletterForm}
                />
                <Blogs recentBlogs={recentEntries} mostViewedBlogs={mostViewedEntries} />
            </div>
        </>
    );
};
