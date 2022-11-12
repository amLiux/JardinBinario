import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { TerminalHeader } from '@/components/Terminal/TerminalHeader';
import { MarkdownResult } from '@/components/NewBlog/MarkdownResult';
import { querys } from '@/gql/querys';
import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { BlogEntry } from '@/types/sharedTypes';
import { useState } from 'react';

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
	const [showMarkdown, setShowMarkdown] = useState<boolean>(true);
	router.events.on('routeChangeStart', () => {
		setShowMarkdown(false);
	});
	return (
		<Layout index>
			<TerminalHeader router={router} read />
			{showMarkdown && <MarkdownResult blogEntry={blogEntry} context={author} preview />}
		</Layout>
	);
}


