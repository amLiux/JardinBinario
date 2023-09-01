import { NextRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Flexbox } from '../lib/Flexbox';
import { NavbarOptions } from '@/components/NavbarOptions';

import { IndexNavbarOptions } from '../IndexNavbarOptions';
import navbarStyles from './Navbar.module.css';
import { CompletionBar } from './CompletionBar';
import { Logo } from '../Logo';

type NavbarProps = {
    handleClickServices?: (ref: string) => void;
    router?: NextRouter;
    privacy?: boolean;
    read?: boolean;
    renderShare?:boolean
};

export const Navbar = ({ handleClickServices, router, read = false, privacy = false, renderShare = true }: NavbarProps) => {

    useEffect(() => {
        window.addEventListener('scroll', handleScroll as any);
        return () => {
            window.removeEventListener('scroll', handleScroll as any);
        };
    });

    const [completion, setCompletion] = useState<number>(0);


    const handleScroll = (e: SyntheticEvent) => {
        const header = document.querySelector('.scroll');
        const currentProgress = window.scrollY;
        currentProgress >= 70 ? header?.classList.add('isSticky') : header?.classList.remove('isSticky');
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
    };


    return (
        <Flexbox
            justifyContent='start'
            alignItems='center'
            html='navbar'
            // scroll class is for the sticky behavior (shadows, completion when reading a blog, etc)
            extraClass={`${navbarStyles.navbar} scroll`}
        >

            <Logo router={router} />

            <IndexNavbarOptions read={read} privacy={privacy} router={router} handleClickServices={handleClickServices} />
            <NavbarOptions read={read && renderShare} editor={!renderShare} />
            
            <CompletionBar read={read} completion={completion} />

        </Flexbox>
    );
};