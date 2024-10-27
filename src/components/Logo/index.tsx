import React from 'react';
import { NextRouter } from 'next/router';

import logo from '@/assets/logo.png';
import Image from 'next/legacy/image';
import logoStyles from './LogoStyles.module.css';

interface LogoProps {
    router?: NextRouter;
}

export const Logo = ({ router }: LogoProps) => {
    return (
        <div
            onClick={() => router?.push('/')}
            className={logoStyles.logoContainer}
        >
            <Image src={logo} alt='Jardin Binario logo' layout='responsive' />
        </div>
    );
};
