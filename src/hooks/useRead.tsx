import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { querys } from '@/gql/querys';
import { BlogEntry } from '@/types/sharedTypes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRead = (
    blogEntry: BlogEntry,
) => {
    const { _id } = blogEntry || {};
    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        const updateBlog = async () => {
            const client = createUnauthorizedApolloClient();
            let metrics = {
                views: true,
                shares: false,
            };

            if (query?.shared) {
                metrics.shares = true;
            }

            await client.mutate({
                mutation: querys.UPDATE_BLOG_METRICS,
                variables: {
                    blogMetricsInput: {
                        _id,
                        ...metrics,
                    }
                }
            });
        };
        updateBlog().catch((_err) => console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        router
    };
};