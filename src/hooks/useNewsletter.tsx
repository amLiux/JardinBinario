import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { NewsletterValues } from '@/types/sharedTypes';
import { useMutation } from '@apollo/client';
import { querys } from '@/gql/querys';
import { generateRequiredMessage } from '@/utils/generateRequiredMessage';
import { timeout } from '@/utils/timeout';

export const useNewsletterForm = () => {
  const initialValues: NewsletterValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Dirección de email inválida')
      .required(generateRequiredMessage('email')),
  });

  const [newNewsletter] = useMutation(querys.NEW_NEWSLETTER);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await timeout(4000);
        const response = await newNewsletter({
          variables: {
            newsletterInput: { ...values },
          },
        });

        if (response.data.newNewsletterEntry) {
          setSubmitted(true);
          // setMessage('Gracias por tu mensaje, estaremos en contacto muy pronto!');
        }
      } catch (err: any) {
        // Maneja errores aquí
        console.error(err);
      }
    },
  });

  return {
    ...formik,
    submitted,
    setSubmitted,
  };
};
