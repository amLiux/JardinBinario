import { useFormik } from 'formik';
import { useState, useRef, RefObject, useEffect } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { NewsletterValues, NewTicketValues } from '@/types/sharedTypes';
import { useMutation } from '@apollo/client';
import { querys } from '@/gql/querys';
import { generateRequiredMessage } from '@/utils/generateRequiredMessage';
import { timeout } from '@/utils/timeout';

export const useIndex = () => {

    const router = useRouter();

    const [newTicket] = useMutation(querys.NEW_TICKET);
    const [newNewsletter] = useMutation(querys.NEW_NEWSLETTER);
    const sharedState = (initialState: boolean) => ({
        contactForm: initialState,
        newsletterForm: initialState
    });

    const [disableButton, setDisableButton] = useState<Record<string, boolean>>(sharedState(true));
    const [submitted, setSubmitted] = useState<Record<string, boolean>>(sharedState(false));

    const [message, setMessage] = useState<string>('');

    const initialValuesContactForm: NewTicketValues = {
        companyName: '',
        email: '',
        description: '',
        service: [],
        phoneNumber: '',
    };

    const initialValuesNewsletter: NewsletterValues = {
        email: '',
    };

    const phoneRegExp = /^[0-9]{4}[-][0-9]{4}$/;

    const formikContactForm = useFormik({
        initialValues: initialValuesContactForm,
        validationSchema: Yup.object({
            companyName: Yup.string().required(generateRequiredMessage('company name')),
            email: Yup.string().email().required(generateRequiredMessage('email')),
            service: Yup.array().of(Yup.string()).min(1),
            description: Yup.string().required(generateRequiredMessage('description')),
            phoneNumber: Yup.string().matches(phoneRegExp, "Phone number's format is invalid").required(generateRequiredMessage('phone number')),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await timeout(4000);
                const response = await newTicket({
                    variables: {
                        ticketInput: {
                            ...values,
                        }
                    }
                });

                if (response.data.newTicket) {
                    let submittedCopy = { ...submitted };
                    submittedCopy.contactForm = true;
                    setSubmitted(submittedCopy);
                    setMessage('Gracias por tu mensaje, estaremos en contacto muy pronto!');
                }
            } catch (err: any) {
                // do we set error here 
                console.error(err);
            }
        },
    });

    const formikNewsletter = useFormik({
        initialValues: initialValuesNewsletter,
        validationSchema: Yup.object({
            email: Yup.string().email().required(generateRequiredMessage('email')),
        }),
        onSubmit: async (values) => {
            try {
                await timeout(4000);
                const response = await newNewsletter({
                    variables: {
                        newsletterInput: {
                            ...values,
                        }
                    }
                });

                if (response.data.newNewsletterEntry) {
                    let submittedCopy = { ...submitted };
                    submittedCopy.newsletterForm = true;
                    setSubmitted(submittedCopy);
                    // setMessage('Gracias por tu mensaje, estaremos en contacto muy pronto!');
                }
            } catch (err: any) {
                // do we set error here 
                console.error(err);
            }
        },
    });

    const refServices = useRef<HTMLDivElement>(null);
    const refForm = useRef<HTMLDivElement>(null);

    const handleClickServices = (ref: string) => {
        const toScrollMapping: Record<string, RefObject<HTMLDivElement>> = {
            ticket: refForm,
            services: refServices,
        };

        const toScroll = toScrollMapping[ref];
        toScroll?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    useEffect(() => {
		let disabledButtonCopy = { ...disableButton };

		if (formikContactForm.isValid) {
			disabledButtonCopy.contactForm = false;
		} else {
			disabledButtonCopy.contactForm = true;
		}

		if (formikNewsletter.isValid) {
			disabledButtonCopy.newsletterForm = false;
		} else {
			disabledButtonCopy.newsletterForm = true;
		}

		setDisableButton(disabledButtonCopy);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formikContactForm.isValid, formikNewsletter.isValid]);

    return {
        disableButton,
        formikContactForm,
        formikNewsletter,
        refServices,
        refForm,
        handleClickServices,
        submitted,
        message,
        router
    };
};