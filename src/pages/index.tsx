import { Layout } from '../components/Layout';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';

import { texts } from '../components/Index/text';
import indexStyles from '../components/Index/Index.module.css';
import { PhotoComposition } from '../components/PhotoComposition';
import { Services } from '../components/Services';
import { TicketForm } from '../components/TicketForm';
import { querys } from '../gql/querys';
import { NewTicketValues } from '../types/sharedTypes';
import { Newsletter } from '../components/Newsletter';

function timeout(delay: number) {
	return new Promise(res => setTimeout(res, delay));
}

export default function IndexPage() {
	const [newTicket] = useMutation(querys.NEW_TICKET);
	const [disableButton, setDisableButton] = useState<boolean>(true);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const initialValues: NewTicketValues = {
		companyName: '',
		email: '',
		description: '',
		service: [],
		phoneNumber: '',
	};

	const phoneRegExp = /^[0-9]{4}[-][0-9]{4}$/;

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			companyName: Yup.string().required('Un nombre de compañia es requerido'),
			email: Yup.string().email().required('Un correo electronico es requerido'),
			service: Yup.array().of(Yup.string()).min(1),
			description: Yup.string().required('Una descripcion es requerida'),
			phoneNumber: Yup.string().matches(phoneRegExp, 'El formato del numero es invalido').required('Un numero telefonico es requerido'),
		}),
		enableReinitialize: true,
		onSubmit: async (values) => {
			try {
				localStorage.setItem('token', '');
				await timeout(4000);
				const response = await newTicket({
					variables: {
						ticketInput: {
							...values,
						}
					}
				});

				if (response.data.newTicket) {
					setSubmitted(true);
					setMessage('Gracias por tu mensaje, estaremos en contacto muy pronto!')
				}
			} catch (err: any) {
				// do we set error here 
				console.error(err);
			}
		},
	});

	const refServices = useRef<HTMLDivElement>(null);
	const refForm = useRef<HTMLDivElement>(null);

	const handleClickServices = (ref:string) => {
		const toScrollMapping:Record<string, RefObject<HTMLDivElement>> = {
			ticket: refForm,
			services: refServices,
		};

		const toScroll = toScrollMapping[ref];
		toScroll?.current?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		if (formik.isValid) {
			setDisableButton(false);
		} else setDisableButton(true);
	}, [formik, formik.values]);

	return (
		<>
			<Layout index>
				<TerminalHeader handleClickServices={handleClickServices} index header='Jardín Binario' />
				<div className={indexStyles.index}>
					<h1>Artesanía convertida en <span className={indexStyles.heading}>tecnología</span> que cosechan tus ideas</h1>
					<span>{texts.subheading}</span>
					<PhotoComposition />
					<h2>Un equipo que busca ayudarte a analizar, <span className={indexStyles.heading}>sembrar y cosechar</span> tus ideas.</h2>
					<span>{texts.subheading2}</span>
					<h3>{texts.heading3}</h3>
					<Services refForScroll={refServices} />
					<TicketForm
						handleChange={formik.handleChange}
						errors={formik.errors}
						values={formik.values}
						handleSubmit={formik.handleSubmit}
						setServices={formik.setFieldValue}
						disabledButton={disableButton}
						submitting={formik.isSubmitting}
						submitted={submitted}
						message={message}
						refForForm={refForm}
					/>
					<Newsletter />
				</div>
			</Layout>
		</>
	)
}
