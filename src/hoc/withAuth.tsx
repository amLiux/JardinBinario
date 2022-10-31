import { useRouter } from 'next/router';
import { ElementType, useEffect, useState } from 'react';
import { useAuth } from '@/apollo/AuthClient';
import { Spinner } from '@/components/Spinner';
import { UserContext } from '@/types/sharedTypes';
import { LoadingSplash } from '@/components/LoadingSplash';

export const withAuth = (Component: ElementType) => {
    const AuthenticatedComponent = () => {
        const router = useRouter();
        const [userContext, setUserContext] = useState<UserContext>();
        const { getUserInfo } = useAuth();

        useEffect(() => {
            const getUser = async () => {
                const response = await getUserInfo();
                // TODO do we want to pull __typname later?
                if (!response) {
                    router.push('/login');
                } else {
                    setUserContext(response);
                }
            };

            setTimeout(() => {
                getUser();
            }, 2200);

        }, [router, getUserInfo]);

        return !!userContext 
            ? 
                <Component userContext={userContext} /> 
            : 
                <LoadingSplash />;
    };

    return AuthenticatedComponent;
};