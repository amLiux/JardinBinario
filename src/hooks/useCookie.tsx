import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { querys } from '@/gql/querys';

interface UserDetails {
    browser?: string;
    language?: string;
    country?: string;
    timezone?: string;
}

export const useCookie = () => {
    const getUserCountry = async () => {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country;
    };

    const getUserTimezone = (): string => {
        // Crear un objeto Intl.DateTimeFormat
        const dtf = new Intl.DateTimeFormat();

        // Obtener la zona horaria del navegador desde las opciones resueltas
        const { timeZone } = dtf.resolvedOptions();

        return timeZone; // por ejemplo: "CST"
    };

    const getUserDetails = async () => {
        // we get this to check if we can upgrade or use new features of js
        const userAgent = window.navigator.userAgent;
        // we get this to check what translations we should give priority to
        const language = window.navigator.language;
        // we get this to know what ideas would adapt to what markets
        const country = await getUserCountry();
        // to know when to send promotions and such
        const timezone = getUserTimezone();
        return {
            language,
            country,
            timezone,
            userAgent,
        };
    };

    const [userDetails, setUserDetails] = useState<UserDetails>({});
    const consent = Cookie.get('cookieConsent');
    const [showBanner, setShowBanner] = useState<boolean>(!consent);

    const handleAccept = async () => {
      Cookie.set('cookieConsent', 'true', { expires: 365 });
      setUserDetails(await getUserDetails());
      setShowBanner(false);
    };
  
    useEffect(() => {
      if(consent && Object.keys(userDetails).length > 0) {
        const createMetricEntry = async () => {
            const client = createUnauthorizedApolloClient();

            await client.mutate({
                mutation: querys.NEW_USER_METRIC,
                variables: {
                    metricsInput: {
                        ...userDetails,
                    }
                }
            });
        };
        createMetricEntry().catch((_err) => console.error);
      }
    }, [userDetails, consent]);

    return {
        handleAccept,
        showBanner,
    };

};