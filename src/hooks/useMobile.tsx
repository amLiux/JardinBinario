import { useEffect, useState } from 'react';

export const useMobile = () => {
    const isClient = typeof window === 'object';

    const [width, setWidth] = useState<number>(isClient ? window.innerWidth : 0);

    useEffect(() => {
        if (!isClient) {
            return;
        }

        function handleWindowSizeChange() {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, [isClient]);

    const isMobile = isClient ? width <= 768 : false;

    return {
        isMobile
    };
};