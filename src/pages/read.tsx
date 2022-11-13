import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import type {MarkdownRestulProps} from '@/components/NewBlog/MarkdownResult';
import dynamic from 'next/dynamic';

const MarkdownResult = dynamic<MarkdownRestulProps>(() => import('@/components/NewBlog/MarkdownResult').then(mod => mod.MarkdownResult), {
  ssr: false,
});

import { Layout } from '@/components/Layout';
import { TerminalHeader } from '@/components/Terminal/TerminalHeader';
import { querys } from '@/gql/querys';
import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { BlogEntry } from '@/types/sharedTypes';
import { Footer } from '@/components/Footer';

export const getServerSideProps = async (context: any) => {
	const { blogId } = context.query;
	const client = createUnauthorizedApolloClient();
	const { data } = await client.query({
		query: querys.GET_BLOG_BY_ID,
		variables: { blogId },
	});

	if (!data) {
		return {
			notFound: true,
		};
	}

	const { title, markdown, createdAt, author, tags }: BlogEntry = data.getSpecificBlogEntry;

	return {
		props: {
			blogEntry: {
				title,
				markdown,
				createdAt,
				author,
				tags
			},
		}
	};
};

export default function ReadBlogPage({ blogEntry }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { author } = blogEntry;
	const router = useRouter();

	return (
		<Layout index>
			<TerminalHeader router={router} read />
			<MarkdownResult blogEntry={blogEntry} context={author} preview />
			<Footer router={router} filePath='read'/>
		</Layout>
	);
}


