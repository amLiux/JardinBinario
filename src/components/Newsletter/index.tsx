import { Input } from '@/components/TicketForm/Input';
import { Sky } from '@/components/404/Sky';
import { Form } from '@/components/Form';
import { Spinner } from '@/components/Spinner';
import ticketFormStyles from '@/components/TicketForm/TicketForm.module.css';

import newsletterStyles from './Newsletter.module.css';
import { Flexbox } from '../lib/Flexbox';
import { useNewsletterForm } from '@/hooks/useNewsletter';

export const Newsletter = () => {
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
        Suscríbete a nuestro newsletter
      </h4>
      <p className={newsletterStyles.subheading}>
        Recibe notificaciones de nuestras últimas actualizaciones, blogs,
        posiciones, ofertas.
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
            'Suscríbete'
          )}
        </button>
      </Flexbox>
      <p className={newsletterStyles.copy}>
        ¡Únete a nuestra lista de correo de Jardín Binario y mantente al tanto
        de nuestras últimas noticias y actualizaciones!{' '}
      </p>
    </Form>
  );
};
