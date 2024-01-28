import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import dynamic from 'next/dynamic';


import { Layout } from '@/components/Layout';
import { querys } from '@/gql/querys';
import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { BlogEntry } from '@/types/sharedTypes';
import { Footer } from '@/components/Footer';
import { useRead } from '@/hooks/useRead';
import { Navbar } from '@/components/Navbar';
import { MarkdownRestulProps } from '@/components/NewBlog/MarkdownResult';
const MarkdownResult = dynamic<MarkdownRestulProps>(() => import('@/components/NewBlog/MarkdownResult').then(mod => mod.MarkdownResult), {
	ssr: true,
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

	const { router } = useRead(blogEntry);

	if (!blogEntry) {
		return null;
	}

	const { title, author, sneakpeak } = blogEntry;

	const seo = {
		title,
		description: sneakpeak,
	};

	return (
		<Layout index customSeo={seo}>
			<Navbar router={router} read />
			<MarkdownResult blogEntry={blogEntry} context={author} preview />
			<Footer router={router} filePath='read/[blogId]' />
		</Layout>
	);
}


