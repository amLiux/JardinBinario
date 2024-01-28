import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import type { MarkdownRestulProps } from '@/components/NewBlog/MarkdownResult';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';

import { Layout } from '@/components/Layout';
import { querys } from '@/gql/querys';
import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { BlogEntry } from '@/types/sharedTypes';
import { Footer } from '@/components/Footer';
import { useRead } from '@/hooks/useRead';
import { SeoMapping } from '@/seo/index';
import { Navbar } from '@/components/Navbar';
import { DynamicSeo } from '@/components/DynamicSeo';

const MarkdownResult = dynamic<MarkdownRestulProps>(() => import('@/components/NewBlog/MarkdownResult').then(mod => mod.MarkdownResult), {
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
		paths: ids.map(({ _id }: any) => ({ params: { blogId: _id } })),
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

	const { title, markdown, createdAt, author, tags, _id, sneakpeak }: BlogEntry = data.getSpecificBlogEntry;

	return {
		props: {
			blogEntry: {
				_id,
				title,
				markdown,
				createdAt,
				author,
				tags,
				sneakpeak,
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

	const seo:SeoMapping = {
		[router.asPath]: {
			title,
			description: sneakpeak,
		}
	};
	
	return (
		<>
			<DynamicSeo seo={seo} asPath={router.asPath} />
			<Layout index>
				<Navbar router={router} read />
				<MarkdownResult blogEntry={blogEntry} context={author} preview />
				<Footer router={router} filePath='read/[blogId]' />
			</Layout>
		</>
	);
}


