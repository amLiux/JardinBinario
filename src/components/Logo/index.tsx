import React from 'react';
import { NextRouter } from 'next/router';

import logo from '@/assets/logo.png';
import littleLogo from '@/assets/littleLogo.png';
import Image from 'next/legacy/image';
import logoStyles from './LogoStyles.module.css';
import Link from 'next/link';

interface LogoProps {
    router?: NextRouter;
    isSmall?: boolean;
}

export const Logo = ({ router, isSmall }: LogoProps) => {

    return (
        <Link
            href="/" passHref scroll={false}
            className={isSmall ? logoStyles.smallLogoContainer : logoStyles.logoContainer}
            onClick={router?.asPath === '/' ? () => window.scrollTo(0, 0) : undefined}
        >
            {
                isSmall ?
                    <Image src={littleLogo} alt='Jardin Binario logo' layout='responsive' /> :
                    <Image src={logo} alt='jardin binario logo little version' layout='responsive' />
            }

        </Link>
    );
};
