import { FormikErrors, FormikHandlers, FormikValues } from 'formik';
import { Input } from '@/components/TicketForm/Input';
import { Sky } from '@/components/404/Sky';
import { NewsletterValues } from '@/types/sharedTypes';
import { Form } from '@/components/Form';
import { Spinner } from '@/components/Spinner';
import ticketFormStyles from '@/components/TicketForm/TicketForm.module.css';

import newsletterStyles from './Newsletter.module.css';

type NewsletterFormProps = {
    handleSubmit: FormikHandlers['handleSubmit'];
    values: FormikValues;
    handleChange: FormikHandlers['handleChange'];
    errors: FormikErrors<NewsletterValues>;
    disabledButton: boolean;
    submitting: boolean;
    submitted: boolean;
    message?: string;
};

export const Newsletter = ({ handleChange, handleSubmit, values, errors, disabledButton, submitting, submitted }: NewsletterFormProps) => {
    return (
        <Form newsletter handleSubmit={handleSubmit}>
            <Sky stars={2} />
            <h4 className={newsletterStyles.header}>Suscríbete a nuestro newsletter</h4>
            <p className={newsletterStyles.subheading}>Recibe notificaciones de nuestras últimas actualizaciones, blogs, posiciones, ofertas.</p>
            <div className={newsletterStyles.inputContainer}>
                <Input
                    newsletter
                    handleChange={handleChange}
                    id='email'
                    value={values.email}
                    placeholder='E-mail'
                    type='text'
                    error={errors.email}
                />
                <button
                    disabled={disabledButton || submitting || (submitted && !submitting) }
                    type='submit'
                    className={`
                        ${ticketFormStyles.submitButton}
                        ${ticketFormStyles.submitButtonNewsletter}
					`}>
                        {submitting || (submitted && !submitting)  ? <Spinner size='little' submitted={submitted}></Spinner> : 'Suscríbete'}
                </button>
            </div>
            <p className={newsletterStyles.copy}>Testeando este texto para ver que tan largo hay que hacerlo.</p>
        </Form>
    );
};
