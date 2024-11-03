import { RefObject } from 'react';

import { NewTicketValues } from '@/types/sharedTypes';
import { Form } from '@/components/Form';
import { RadioGroup } from '@/components/RadioGroup';
import { Spinner } from '@/components/Spinner';
import { Flexbox } from '@/components/lib/Flexbox';
import { useContactForm } from '@/hooks/useContactForm';

import { Input } from './Input';
import ticketFormStyles from './TicketForm.module.css';
import { ModernHeader } from '@/lib/Header';

type TicketFormProps = {
  refForForm: RefObject<HTMLDivElement>;
  t: (key: string) => string;
};

export const TicketForm = ({ refForForm, t }: TicketFormProps) => {
  const {
    isSubmitting,
    submitted,
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue: setServices,
    isValid,
    servicesToSend,
    setServicesToSend,
    textInputValues,
    textInputValuesMapping,
    services,
  } = useContactForm(t);

  return (
    <div ref={refForForm}>
      <ModernHeader
        title={t('ticketForm.header.title')}
        highlight={t('ticketForm.header.highlight')}
        copy={t('ticketForm.header.copy')}
      />
      <div
        className={`${ticketFormStyles.formContainer} ${isSubmitting || (submitted && !isSubmitting) ? 'flex flex-col justify-center items-center' : ''}`}
      >
        {isSubmitting || (submitted && !isSubmitting) ? (
          <Spinner submitted={submitted} size="big" />
        ) : (
          <>
            <h4 className={ticketFormStyles.formHeading}>
              {t('ticketForm.form.title')}
            </h4>
            <Form handleSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row">
                <Flexbox justifyContent="evenly" flexDirection="column">
                  {textInputValues.map((textInput, idx) => {
                    const textInputAsKey = textInput as keyof NewTicketValues;
                    const { friendlyName, placeholder, type } =
                      textInputValuesMapping[textInputAsKey];
                    return (
                      <Input
                        handleChange={handleChange}
                        id={textInput}
                        value={values[textInputAsKey] as any}
                        textInputAsKey={textInputAsKey}
                        friendlyName={friendlyName}
                        placeholder={placeholder}
                        type={type}
                        key={idx}
                        error={errors[textInputAsKey]}
                      />
                    );
                  })}
                </Flexbox>
                <div className={ticketFormStyles.textInputBox}>
                  <label
                    className={`${ticketFormStyles.textInputLabel}`}
                    htmlFor="description"
                  >
                    {t('ticketForm.form.labels.description')}
                  </label>
                  <textarea
                    value={values.description}
                    className={`resize-none h-[87%] ${ticketFormStyles.textInput} ${errors?.hasOwnProperty('description') ? 'ring-2 ring-red-500 focus:ring-2 focus:border-purple-500' : ''}`}
                    onChange={handleChange}
                    id="description"
                    placeholder={t('ticketForm.form.placeholders.description')}
                  />
                </div>
              </div>
              <RadioGroup
                value={[]}
                labelText={t('ticketForm.form.services.title')}
                onChange={(index) => {
                  const service = services[index].toLowerCase();
                  servicesToSend.includes(service)
                    ? setServicesToSend(
                      servicesToSend.filter(
                        (includedService) => includedService !== service
                      )
                    )
                    : setServicesToSend([...servicesToSend, service]);

                  if (servicesToSend !== values.service) {
                    const toSet = [...servicesToSend, service];
                    setServices('service', toSet);
                  }
                }}
                options={services.map((service, idx) => (
                  <div
                    key={idx}
                    className={`${errors.hasOwnProperty('service') ? '' : ''} flex ml-2 md:ml-4 justify-around`}
                  >
                    <span className="font-bold text-xs md:text-base appearance-none text-gray-600">
                      {service}
                    </span>
                  </div>
                ))}
              />
              <button
                disabled={!isValid}
                type="submit"
                className={ticketFormStyles.submitButton}
              >
                {isSubmitting ? <Spinner></Spinner> : t('ticketForm.form.submit')}
              </button>
            </Form>
          </>
        )}
      </div>
      <span className="mt-20 text-sm italic">
        {t('ticketForm.muted')}
      </span>
    </div>
  );
};
