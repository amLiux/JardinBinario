import { Layout } from '../components/Layout';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { InferGetServerSidePropsType } from 'next';


import { texts } from '../components/Index/text';
import indexStyles from '../components/Index/Index.module.css';
import { PhotoComposition } from '../components/PhotoComposition';
import { Services } from '../components/Services';
import { TicketForm } from '../components/TicketForm';
import { querys } from '../gql/querys';
import { NewsletterValues, NewTicketValues } from '../types/sharedTypes';
import { Newsletter } from '../components/Newsletter';
import { CustomSwiper } from '../components/Swiper';
import { createUnauthorizedApolloClient } from '../apollo/AuthClient';
import { Footer } from '../components/Footer';

export const getServerSideProps = async (context: any) => {
	const client = createUnauthorizedApolloClient();

	const { data: { getRecentEntries } } = await client.query({
		query: querys.GET_RECENT_BLOGS,
	});

	const { data: { getMostViewedEntries } } = await client.query({
		query: querys.GET_MOST_VIEWED_BLOGS,
	});

	if (!getRecentEntries || !getMostViewedEntries) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			recentEntries: getRecentEntries,
			mostViewedEntries: getMostViewedEntries
		}
	};
}

function timeout(delay: number) {
	return new Promise(res => setTimeout(res, delay));
}

export default function IndexPage({ recentEntries, mostViewedEntries }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [newTicket] = useMutation(querys.NEW_TICKET);
	const [newNewsletter] = useMutation(querys.NEW_NEWSLETTER);

	const sharedState = (initialState: boolean) => ({
		contactForm: initialState,
		newsletterForm: initialState
	});

	const [disableButton, setDisableButton] = useState<Record<string, boolean>>(sharedState(true));
	const [submitted, setSubmitted] = useState<Record<string, boolean>>(sharedState(false));

	const [message, setMessage] = useState<string>('');

	const initialValuesContactForm: NewTicketValues = {
		companyName: '',
		email: '',
		description: '',
		service: [],
		phoneNumber: '',
	};

	const initialValuesNewsletter: NewsletterValues = {
		email: '',
	};

	const phoneRegExp = /^[0-9]{4}[-][0-9]{4}$/;

	const formikContactForm = useFormik({
		initialValues: initialValuesContactForm,
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
				await timeout(4000);
				const response = await newTicket({
					variables: {
						ticketInput: {
							...values,
						}
					}
				});

				if (response.data.newTicket) {
					let submittedCopy = { ...submitted };
					submittedCopy.contactForm = true;
					setSubmitted(submittedCopy);
					setMessage('Gracias por tu mensaje, estaremos en contacto muy pronto!')
				}
			} catch (err: any) {
				// do we set error here 
				console.error(err);
			}
		},
	});

	const formikNewsletter = useFormik({
		initialValues: initialValuesNewsletter,
		validationSchema: Yup.object({
			email: Yup.string().email().required('Un correo electronico es requerido'),
		}),
		onSubmit: async (values) => {
			try {
				await timeout(4000);
				const response = await newNewsletter({
					variables: {
						newsletterInput: {
							...values,
						}
					}
				});

				if (response.data.newNewsletterEntry) {
					let submittedCopy = { ...submitted };
					submittedCopy.newsletterForm = true;
					setSubmitted(submittedCopy);
					// setMessage('Gracias por tu mensaje, estaremos en contacto muy pronto!');
				}
			} catch (err: any) {
				// do we set error here 
				console.error(err);
			}
		},
	});

	const refServices = useRef<HTMLDivElement>(null);
	const refForm = useRef<HTMLDivElement>(null);

	const handleClickServices = (ref: string) => {
		const toScrollMapping: Record<string, RefObject<HTMLDivElement>> = {
			ticket: refForm,
			services: refServices,
		};

		const toScroll = toScrollMapping[ref];
		toScroll?.current?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		let disabledButtonCopy = { ...disableButton };

		if (formikContactForm.isValid) {
			disabledButtonCopy.contactForm = false;
		} else {
			disabledButtonCopy.contactForm = true;
		}

		if (formikNewsletter.isValid) {
			disabledButtonCopy.newsletterForm = false;
		} else {
			disabledButtonCopy.newsletterForm = true;
		}

		setDisableButton(disabledButtonCopy);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formikContactForm.isValid, formikNewsletter.isValid]);

	return (
		<Layout index>
			<TerminalHeader handleClickServices={handleClickServices} index header='Jardín Binario' />
			<div className={indexStyles.index}>
				<h1>Artesanía convertida en <span className={indexStyles.heading}>tecnología</span> que cosechan tus ideas</h1>
				<p>{texts.subheading}</p>
				<PhotoComposition />
				<h2 className='mt-0'>Un equipo que busca ayudarte a analizar, <span className={indexStyles.heading}>sembrar y cosechar</span> tus ideas.</h2>
				<p>{texts.subheading2}</p>
				<h3>{texts.heading3}</h3>
				<Services refForScroll={refServices} />
				<TicketForm
					handleChange={formikContactForm.handleChange}
					errors={formikContactForm.errors}
					values={formikContactForm.values}
					handleSubmit={formikContactForm.handleSubmit}
					setServices={formikContactForm.setFieldValue}
					disabledButton={disableButton.contactForm}
					submitting={formikContactForm.isSubmitting}
					submitted={submitted.contactForm}
					message={message}
					refForForm={refForm}
				/>
				<Newsletter
					handleSubmit={formikNewsletter.handleSubmit}
					handleChange={formikNewsletter.handleChange}
					submitting={formikNewsletter.isSubmitting}
					values={formikNewsletter.values}
					errors={formikNewsletter.errors}
					disabledButton={disableButton.newsletterForm}
					submitted={submitted.newsletterForm}
				/>
				<CustomSwiper recentBlogs={recentEntries} mostViewedBlogs={mostViewedEntries} />
			</div>
		</Layout>

	)
}
