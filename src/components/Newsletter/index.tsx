import { Input } from '@/components/TicketForm/Input';
import { Sky } from '@/components/404/Sky';
import { Form } from '@/components/Form';
import { Spinner } from '@/components/Spinner';
import ticketFormStyles from '@/components/TicketForm/TicketForm.module.css';

import newsletterStyles from './Newsletter.module.css';
import { Flexbox } from '../lib/Flexbox';
import { useNewsletterForm } from '@/hooks/useNewsletter';
import useTranslation from 'next-translate/useTranslation';

interface NewsletterProps {
  t: (key: string) => string;
}

export const Newsletter = ({ t }: NewsletterProps) => {
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    submitted,
    isSubmitting,
    isValid,
  } = useNewsletterForm();

  return (
    <Form newsletter handleSubmit={handleSubmit}>
      <Sky stars={2} />
      <h4 className={newsletterStyles.header}>
        {t('newsletter.title')}
      </h4>
      <p className={newsletterStyles.subheading}>
        {t('newsletter.subheading')}
      </p>
      <Flexbox alignItems="center" extraClass={newsletterStyles.inputContainer}>
        <Input
          newsletter
          handleChange={handleChange}
          id="email"
          value={values.email}
          placeholder="E-mail"
          type="text"
          error={errors.email}
        />
        <button
          disabled={!isValid || isSubmitting || (submitted && !isSubmitting)}
          type="submit"
          className={`
            ${ticketFormStyles.submitButton}
            ${ticketFormStyles.submitButtonNewsletter}
		  `}
        >
          {isSubmitting || (submitted && !isSubmitting) ? (
            <Spinner size="little" submitted={submitted}></Spinner>
          ) : (
            t('newsletter.cta')
          )}
        </button>
      </Flexbox>
      <p className={newsletterStyles.copy}>
        {t('newsletter.copy')}
      </p>
    </Form>
  );
};
