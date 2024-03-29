import { InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer';
import { querys } from '@/gql/querys';
import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { useIndex } from '@/hooks/useIndex';
import { IndexScreenProps } from '@/screens/indexScreen';
import { useQuery } from '@apollo/client';
import { Navbar } from '@/components/Navbar';


const IndexScreen = dynamic<IndexScreenProps>(() => import('@/screens/indexScreen').then(mod => mod.IndexScreen), {
	ssr: false,
	loading: ({ isLoading }) => isLoading ? <div className='min-h-screen'></div> : null,
});


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
		handleClickServices,
		// TODO think about a router HOC or a way to pass this easily to instanciate it just once on <App/> level maybe?
		router,
		...restOfIndexProps
	} = useIndex();

	const {loading: imagesLoading, error, data } = useQuery(querys.GET_ALL_IMAGES_OF_TODAY);

	return (
		<Layout index>
			<Navbar router={router} handleClickServices={handleClickServices} />
			<IndexScreen
				recentEntries={recentEntries}
				mostViewedEntries={mostViewedEntries}
				imagesLoading={imagesLoading}
				imagesError={error}
				images={data}
				{...restOfIndexProps}
			/>
			<Footer filePath='index' router={router} />
		</Layout>
	);
}
