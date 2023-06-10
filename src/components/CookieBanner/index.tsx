import React from 'react';
import Link from 'next/link';
import cookieBannerStyles from './CookieBanner.module.css';
import { useCookie } from '@/hooks/useCookie';
import { Flexbox } from '../lib/Flexbox';

const CookieBanner = () => {

  const { showBanner, handleAccept } = useCookie();

  return (
    <>
      {showBanner && (
        <Flexbox justifyContent='space-around' alignItems='center' extraClass={cookieBannerStyles.container}>
          <p className={cookieBannerStyles.cookieMessage}>
            Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Al continuar navegando por este sitio, usted acepta nuestro uso de cookies. Puedes familiarizarte con nuestra
            <Link href='/privacy' passHref>
              <span className={cookieBannerStyles.link}>Política de Privacidad.</span>
            </Link>
          </p>
          <button onClick={handleAccept} className={cookieBannerStyles.button}>
            Aceptar
          </button>
        </Flexbox>
      )}
    </>
  );
};

export default CookieBanner;