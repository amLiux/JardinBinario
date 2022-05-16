import { useRouter } from "next/router";
import { ElementType, useEffect, useState } from "react";
import { useAuth } from "../apollo/AuthClient";

export const withAuth = (Component: ElementType) => {
    const AuthenticatedComponent = () => {
        const router = useRouter();
        const [userContext, setUserContext] = useState()
        const { getUserInfo } = useAuth();

        useEffect(() => {
            const getUser = async () => {
                const response = await getUserInfo();

                if (!response) {
                    router.push('/login');
                } else {
                    setUserContext(response);
                }
            };
            getUser();
        }, [router, getUserInfo]);

        return !!userContext ? <Component userContext={userContext} /> : <div className="w-screen h-screen bg-slate-900">hello</div>; //TODO do we add a skeleton approach or go by simply running a cool ouroboros spinner?
    };

    return AuthenticatedComponent;
};