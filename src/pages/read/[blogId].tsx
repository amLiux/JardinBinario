import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import type { MarkdownRestulProps } from '@/components/NewBlog/MarkdownResult';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';

import { Layout } from '@/components/Layout';
import { TerminalHeader } from '@/components/Terminal/TerminalHeader';
import { querys } from '@/gql/querys';
import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { BlogEntry } from '@/types/sharedTypes';
import { Footer } from '@/components/Footer';
import Head from 'next/head';
import { useRead } from '@/hooks/useRead';

const MarkdownResult = dynamic<MarkdownRestulProps>(() => import('@/components/NewBlog/MarkdownResult').then(mod => mod.MarkdownResult), {
	ssr: false,
	loading: ({ isLoading }) => isLoading ? <div className='min-h-screen'></div> : null,
});
interface IParams extends ParsedUrlQuery {
	blogId: string
}

export const getStaticPaths: GetStaticPaths = async () => {
	const client = createUnauthorizedApolloClient();
	const { data } = await client.query({
		query: querys.GET_ALL_BLOGS_IDS,
	});

	const ids = data.getAllEntriesIds;

	return {
		paths: ids.map(({ id }: any) => ({ params: { blogId: id } })),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { blogId } = params as IParams;
	const client = createUnauthorizedApolloClient();
	const { data } = await client.query({
		query: querys.GET_BLOG_BY_ID,
		variables: { blogId },
	});

	const { title, markdown, createdAt, author, tags, id }: BlogEntry = data.getSpecificBlogEntry;

	return {
		props: {
			blogEntry: {
				id,
				title,
				markdown,
				createdAt,
				author,
				tags
			},
		}
	};
};

export default function ReadBlogPage({ blogEntry }: InferGetStaticPropsType<typeof getStaticProps>) {
	const {
		title,
		sneakpeak,
		router,
		author,
	} = useRead(blogEntry);
	
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={sneakpeak} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={sneakpeak} />
				{/* <meta property="og:image" content={page?.data?.image} /> */}
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={'https://jardinbinario.com' + router.asPath}
				/>
			</Head>
			<Layout index dynamicSeo>
				<TerminalHeader router={router} read />
				<MarkdownResult blogEntry={blogEntry} context={author} preview />
				<Footer router={router} filePath='read' />
			</Layout>
		</>
	);
}


