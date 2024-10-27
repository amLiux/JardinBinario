import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flexbox } from '../lib/Flexbox';
import menu from '@/assets/buttons/menu.svg';
import close from '@/assets/buttons/close.svg';

import Image from "next/legacy/image";
import { Logo } from '../Logo';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface BurgerMenuProps {
    isMobile: boolean;
    privacy: boolean;
}

const BurgerMenu = ({ isMobile, privacy }: BurgerMenuProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    if (!isMobile) return null;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='ml-auto pr-2'>
            <button onClick={toggleMenu}>
                <Image src={menu} width={48} height={48} alt='burguer menu' />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: -1000 }}
                        animate={{ y: 0 }}
                        exit={{ y: -1000 }}
                        transition={{ duration: 0.7 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(2, 6, 23, 1)',
                            zIndex: 1000,
                        }}
                    >
                        <button onClick={() => setIsOpen(false)} className='fixed right-3 top-5'>
                            <Image src={close} width={48} height={48} alt='close menu button' />
                        </button>
                        <Flexbox extraClass='h-[100%]' justifyContent='center' alignItems='center'>
                            <div style={{color: 'white'}}>
                            <Logo router={router} />
                            {privacy ? null : <ul className='mt-5'>
                                <li className='border-b-2 hover:border-purple-500'>
                                    <Link href="/privacy">Privacy</Link>
                                </li>
                            </ul>}
                            </div>
                        </Flexbox>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BurgerMenu;