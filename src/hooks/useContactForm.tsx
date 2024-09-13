import { useFormik } from 'formik';
import { useState, useMemo } from 'react';
import * as Yup from 'yup';

import { NewTicketValues } from '@/types/sharedTypes';
import { useMutation } from '@apollo/client';
import { querys } from '@/gql/querys';
import { generateRequiredMessage } from '@/utils/generateRequiredMessage';
import { timeout } from '@/utils/timeout';

type TextInputValuesMapping = {
  friendlyName: string;
  extraStyling: string;
  placeholder: string;
  type: string;
};

export const useContactForm = () => {
  const textInputValues: string[] = ['companyName', 'email', 'phoneNumber'];
  const services = ['Frontend', 'Backend', 'Diseño', 'Educacion', 'Mobile'];

  const textInputValuesMapping: Record<string, TextInputValuesMapping> = {
    companyName: {
      friendlyName: 'Compañía',
      extraStyling: "after:content-['🏛️']",
      placeholder: 'Tu compañía',
      type: 'text',
    },
    email: {
      friendlyName: 'E-mail',
      extraStyling: "after:content-['✉️']",
      placeholder: 'Tu e-mail',
      type: 'email',
    },
    phoneNumber: {
      friendlyName: 'Número telefónico',
      extraStyling: "after:content-['📱']",
      placeholder: 'Tu número',
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
  };
};
