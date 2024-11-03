import { useFormik } from 'formik';
import { useState, useMemo } from 'react';
import * as Yup from 'yup';

import { NewTicketValues } from '@/types/sharedTypes';
import { useMutation } from '@apollo/client';
import { querys } from '@/gql/querys';
import { generateRequiredMessage } from '@/utils/generateRequiredMessage';
import { timeout } from '@/utils/timeout';
import useTranslation from 'next-translate/useTranslation';

type TextInputValuesMapping = {
  friendlyName: string;
  placeholder: string;
  type: string;
};

export const useContactForm = (t: (key: string) => string) => {
  const textInputValues: string[] = ['companyName', 'email', 'phoneNumber'];
  const services = [
    t('ticketForm.form.services.frontEnd'),
    t('ticketForm.form.services.backEnd'),
    t('ticketForm.form.services.design'),
    t('ticketForm.form.services.education'),
    t('ticketForm.form.services.mobile'),

  ];

  const textInputValuesMapping: Record<string, TextInputValuesMapping> = {
    companyName: {
      friendlyName: t('ticketForm.form.labels.company'),
      placeholder: t('ticketForm.form.placeholders.company'),
      type: 'text',
    },
    email: {
      friendlyName: t('ticketForm.form.labels.email'),
      placeholder: t('ticketForm.form.placeholders.email'),
      type: 'email',
    },
    phoneNumber: {
      friendlyName: t('ticketForm.form.labels.phoneNumber'),
      placeholder: t('ticketForm.form.placeholders.phoneNumber'),
      type: 'phone',
    },
  };

  const [servicesToSend, setServicesToSend] = useState<string[]>([]);

  const [newTicket] = useMutation(querys.NEW_TICKET);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');

  const initialValuesContactForm: NewTicketValues = {
    companyName: '',
    email: '',
    description: '',
    service: [],
    phoneNumber: '',
  };

  const phoneRegExp = /^[0-9]{4}[-][0-9]{4}$/;

  const formik = useFormik({
    initialValues: initialValuesContactForm,
    validationSchema: Yup.object({
      companyName: Yup.string().required(
        generateRequiredMessage('company name')
      ),
      email: Yup.string().email().required(generateRequiredMessage('email')),
      service: Yup.array().of(Yup.string()).min(1),
      description: Yup.string().required(
        generateRequiredMessage('description')
      ),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, "Phone number's format is invalid")
        .required(generateRequiredMessage('phone number')),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await timeout(4000);
        const response = await newTicket({
          variables: {
            ticketInput: {
              ...values,
            },
          },
        });

        if (response.data.newTicket) {
          setSubmitted(true);
          setMessage(
            'Gracias por tu mensaje, estaremos en contacto muy pronto!'
          );
        }
      } catch (err: any) {
        // do we set error here
        console.error(err);
      }
    },
  });

  return {
    ...formik,
    submitted,
    message,
    servicesToSend,
    setServicesToSend,
    textInputValues,
    textInputValuesMapping,
    services,
    t,
  };
};
