import { RefObject } from 'react';

import { NewTicketValues } from '@/types/sharedTypes';
import { Form } from '@/components/Form';
import { RadioGroup } from '@/components/RadioGroup';
import { Spinner } from '@/components/Spinner';
import { Flexbox } from '@/components/lib/Flexbox';
import { useContactForm } from '@/hooks/useContactForm';

import { Input } from './Input';
import ticketFormStyles from './TicketForm.module.css';

type TicketFormProps = {
  refForForm: RefObject<HTMLDivElement>;
};

export const TicketForm = ({ refForForm }: TicketFormProps) => {
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
  } = useContactForm();

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        Te interesa proponer o invertir en alguna de nuestras ideas?
      </h2>
      <span ref={refForForm} className={ticketFormStyles.coolHeading}>
        <h3>Contáctanos!</h3>
      </span>
      <div
        className={`${ticketFormStyles.formContainer} ${isSubmitting || (submitted && !isSubmitting) ? 'flex flex-col justify-center items-center' : ''}`}
      >
        {isSubmitting || (submitted && !isSubmitting) ? (
          <Spinner submitted={submitted} size="big" />
        ) : (
          <>
            <h4 className={ticketFormStyles.formHeading}>
              Formulario de contacto
            </h4>
            <Form handleSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row">
                <Flexbox justifyContent="evenly" flexDirection="column">
                  {textInputValues.map((textInput, idx) => {
                    const textInputAsKey = textInput as keyof NewTicketValues;
                    const { friendlyName, placeholder, type, extraStyling } =
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
                        extraLabelStyling={extraStyling}
                        key={idx}
                        error={errors[textInputAsKey]}
                      />
                    );
                  })}
                </Flexbox>
                <div className={ticketFormStyles.textInputBox}>
                  <label
                    className={`after:content-['👂'] ${ticketFormStyles.textInputLabel}`}
                    htmlFor="description"
                  >
                    Cuéntanos un poco sobre tu proyecto
                  </label>
                  <textarea
                    value={values.description}
                    className={`resize-none h-[87%] ${ticketFormStyles.textInput} ${errors?.hasOwnProperty('description') ? 'ring-2 ring-red-500 focus:ring-2 focus:border-purple-500' : ''}`}
                    onChange={handleChange}
                    id="description"
                    placeholder="Una pequeña descripcion de la implementacion que quieres, la tecnologia que quieres aprender, tu experiencia..."
                  />
                </div>
              </div>
              <RadioGroup
                value={[]}
                labelText="Servicios"
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
                {isSubmitting ? <Spinner></Spinner> : 'Enviar'}
              </button>
            </Form>
          </>
        )}
      </div>
      <span className="mt-20 text-sm italic">
        Contáctanos para poder brindarte servicios de asesoría, cotizaciones o
        si quieres ser parte de nuestro equipo.
      </span>
    </>
  );
};
