import { InferGetServerSidePropsType } from 'next';

import { Layout } from '../components/Layout';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { Footer } from '../components/Footer';
import { texts } from '../components/Index/text';
import indexStyles from '../components/Index/Index.module.css';
import { PhotoComposition } from '../components/PhotoComposition';
import { Services } from '../components/Services';
import { TicketForm } from '../components/TicketForm';
import { querys } from '../gql/querys';
import { Newsletter } from '../components/Newsletter';
import { CustomSwiper } from '../components/Swiper';
import { createUnauthorizedApolloClient } from '../apollo/AuthClient';
import { useIndex } from '../hooks/useIndex';
import { HeadingBlock } from '../components/Index/HeadingBlock';

export const getServerSideProps = async () => {
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
		};
	}

	return {
		props: {
			recentEntries: getRecentEntries,
			mostViewedEntries: getMostViewedEntries
		}
	};
};

export default function IndexPage({ recentEntries, mostViewedEntries }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const {
		disableButton,
		formikContactForm,
		formikNewsletter,
		refServices,
		refForm,
		handleClickServices,
		submitted,
		message,
		// TODO think about a router HOC or a way to pass this easily to instanciate it just once on <App/> level maybe?
		router
	} = useIndex();

	return (
		<Layout index>
			<TerminalHeader router={router} handleClickServices={handleClickServices} index header='Jardín Binario' />
			<div className={indexStyles.index}>
				<HeadingBlock
					subheadingAnimationDirection='Right'
					headingAnimationDirection='Left'
					tag='h1'
					heading={texts.heading}
					subheading={texts.subheading} 
				/>
				<PhotoComposition />
				<HeadingBlock
					headingAnimationDirection='Right'
					subheadingAnimationDirection='Left'
					tag='h2'
					heading={texts.heading2}
					subheading={texts.subheading2}
				/>
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
				<CustomSwiper router={router} recentBlogs={recentEntries} mostViewedBlogs={mostViewedEntries} />
			</div>
			<Footer router={router} />
		</Layout>
	);
}
