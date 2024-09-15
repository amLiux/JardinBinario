import { useRouter } from 'next/router';
import { ElementType, useEffect, useState } from 'react';
import { useAuth } from '@/apollo/AuthClient';
import { BasicObject, UserContext } from '@/types/sharedTypes';
import { LoadingSplash } from '@/components/LoadingSplash';

export const withAuth = (Component: ElementType) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const redirectTo = window.location.pathname;
    const [queryParams, setQueryParams] = useState<Record<string, string>>({});
    if (!(Object.keys(queryParams).length > 0) && redirectTo !== '/admin/login') {
      setQueryParams({ redirectTo });
    }

    const [userContext, setUserContext] = useState<UserContext>();
    const { getUserInfo } = useAuth();

    useEffect(() => {
      const getUser = async () => {
        const response = await getUserInfo();
        // TODO do we want to pull __typname later?
        if (!response) {
          router.push({
            pathname: '/admin/login',
            query: queryParams as any,
          });
        } else {
          setUserContext(response);
        }
      };

      setTimeout(() => {
        getUser();
      }, 2200);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserInfo]);

    return !!userContext ? (
      <Component userContext={userContext} />
    ) : (
      <LoadingSplash />
    );
  };

  return AuthenticatedComponent;
};
