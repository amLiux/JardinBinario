import { FormikErrors, FormikHandlers, FormikHelpers, FormikValues } from 'formik';
import { RefObject, useState } from 'react';
import { NewTicketValues } from '../../types/sharedTypes';
import { Form } from '../Form';
import { RadioGroup } from '../RadioGroup';
import { Spinner } from '../Spinner';
import { Input } from './Input';
import ticketFormStyles from './TicketForm.module.css';

type TicketFormProps = {
    handleSubmit: FormikHandlers['handleSubmit'];
    values: FormikValues;
    handleChange: FormikHandlers['handleChange'];
    errors: FormikErrors<NewTicketValues>;
    setServices: FormikHelpers<NewTicketValues>['setFieldValue'];
    disabledButton: boolean;
    submitting: boolean;
    submitted: boolean;
    message: string;
    refForForm: RefObject<HTMLDivElement>;
};

type TextInputValuesMapping = {
    friendlyName: string,
    extraStyling: string;
    placeholder: string;
    type: string;
};


const textInputValues: string[] = ['companyName', 'email', 'phoneNumber'];

const textInputValuesMapping: Record<string, TextInputValuesMapping> = {
    companyName: {
        friendlyName: 'Compañía',
        extraStyling: "after:content-['🏛️']",
        placeholder: 'Tu compañía',
        type: 'text'
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
        type: 'phone'
    }
};

const services = ['Frontend', 'Backend', 'Diseño', 'Educacion', 'Mobile'];
export const TicketForm = ({ handleSubmit, values, handleChange, errors, setServices, disabledButton, submitting, submitted, message, refForForm }: TicketFormProps) => {
    const [servicesToSend, setServicesToSend] = useState<string[]>([]);

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Te interesa alguno de nuestros servicios?</h2>
            <span ref={refForForm} className={ticketFormStyles.coolHeading}>
                <h3>Contáctanos!</h3>
            </span>
            <div className={`${ticketFormStyles.formContainer} ${submitting || (submitted && !submitting) ? 'flex flex-col justify-center items-center' : ''}`}>
                {
                    submitting || (submitted && !submitting)
                        ? <Spinner submitted={submitted} size='big' />
                        : <>
                            <h4 className={ticketFormStyles.formHeading}>Formulario de contacto</h4>
                            <Form handleSubmit={handleSubmit}>
                                <div className='flex flex-col md:flex-row'>
                                    <div className={ticketFormStyles.textInputContainer}>
                                        {
                                            textInputValues.map((textInput, idx) => {
                                                const textInputAsKey = textInput as keyof NewTicketValues;
                                                const { friendlyName, placeholder, type, extraStyling } = textInputValuesMapping[textInputAsKey];
                                                return (
                                                    <Input
                                                        handleChange={handleChange}
                                                        id={textInput}
                                                        value={values[textInputAsKey]}
                                                        textInputAsKey={textInputAsKey}
                                                        friendlyName={friendlyName}
                                                        placeholder={placeholder}
                                                        type={type}
                                                        extraStyling={extraStyling}
                                                        key={idx}
                                                        error={errors[textInputAsKey]}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                    <div className={ticketFormStyles.textInputBox}>
                                        <label
                                            className={`after:content-['👂'] ${ticketFormStyles.textInputLabel}`} htmlFor='description'
                                        >
                                            Cuéntanos un poco sobre tu proyecto
                                        </label>
                                        <textarea
                                            value={values.description}
                                            className={`
                                            resize-none h-[87%] ${ticketFormStyles.textInput} 
                                            ${errors?.hasOwnProperty('description') ? 'ring-2 ring-red-500 focus:ring-2 focus:border-purple-500' : ''}`
                                            }
                                            onChange={handleChange}
                                            id='description'
                                            placeholder='Una pequeña descripcion de la implementacion que quieres, la tecnologia que quieres aprender, tu experiencia...'
                                        />
                                    </div>
                                </div>
                                <RadioGroup
                                    value={[]}
                                    labelText='Servicios'
                                    onChange={
                                        (index) => {
                                            const service = services[index].toLowerCase();
                                            servicesToSend.includes(service)
                                                ? setServicesToSend(servicesToSend.filter((includedService) => includedService !== service))
                                                : setServicesToSend([...servicesToSend, service]);

                                            if (servicesToSend !== values.service) {
                                                const toSet = [...servicesToSend, service];
                                                setServices('service', toSet);
                                            }
                                        }
                                    }
                                    options={
                                        services.map((service, idx) =>
                                            <div key={idx}
                                                className={`
                                                ${errors.hasOwnProperty('service') ? '' : ''}
                                                flex ml-2 md:ml-4 justify-around
                                            `}
                                            >
                                                <span className='font-bold text-xs md:text-base appearance-none text-gray-600'>{service}</span>
                                            </div>
                                        )
                                    }
                                />
                                <button disabled={disabledButton} type='submit' className={ticketFormStyles.submitButton}>
                                    {submitting ? <Spinner></Spinner> : 'Enviar'}
                                </button>
                            </Form>
                        </>
                }

            </div>
            <span className='mt-20 text-sm italic'>Contáctanos para poder brindarte servicios de asesoría, cotizaciones o si quieres ser parte de nuestro equipo.</span>
        </>
    );
};
