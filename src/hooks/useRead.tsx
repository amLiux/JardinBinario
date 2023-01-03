import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { querys } from '@/gql/querys';
import { BlogEntry } from '@/types/sharedTypes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRead = (
    blogEntry: BlogEntry,
) => {

    const { author, title, sneakpeak, id } = blogEntry;
	const router = useRouter();
	const { query } = router;

	useEffect(() => {
        const updateBlog = async () => {
            if(query.shared && id) {
                const client = createUnauthorizedApolloClient();

                await client.mutate({
                    mutation: querys.UPDATE_BLOG_SHARES,
                    variables: {
                        blogSharesInput: {
                            id,
                        }
                    }
                });
            }
        };
        updateBlog().catch((err) => console.error);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    return {
        author,
        title,
        sneakpeak,
        router
    };
};