import { useRef, RefObject, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useIndex = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const refServices = useRef<HTMLDivElement>(null);
  const refForm = useRef<HTMLDivElement>(null);

  const handleClickServices = (ref: string) => {
    const toScrollMapping: Record<string, RefObject<HTMLDivElement>> = {
      ticket: refForm,
      services: refServices,
    };

    const toScroll = toScrollMapping[ref];
    toScroll?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return {
    refServices,
    refForm,
    handleClickServices,
    router,
  };
};
