import { useRouter } from 'next/router';
import React from 'react';
import indexNavbarOptionsStyles from './IndexNavbarOptions.module.css';

type Tab = {
	text: string;
	route: string;
	link: boolean;
	ctaButton?: boolean;
}

interface IndexNavbarOptionsProps {
    handleClickServices?: () => void;
}

const tabs: Tab[] = [
	{
		text: 'Blog',
		route: '/blog',
		link: true,
	},
    {
		text: 'Servicios',
		route: '#services',
		link: false,
	},
	{
		text: 'Contactanos',
		route: '#ticket',
		link: false,
		ctaButton: true,
	},
];

export const IndexNavbarOptions = ({handleClickServices}:IndexNavbarOptionsProps) => {
    const router = useRouter();

    return (
        <ul className={indexNavbarOptionsStyles.container}>
            {
                tabs.map(({ text, link, route, ctaButton }, idx) =>
                    <li key={idx} className='mx-5'>
                        <button
                            className={`
                                ${ctaButton ? indexNavbarOptionsStyles.ctaButton : indexNavbarOptionsStyles.linkStyle}`
                            }
                            onClick={() => link ? router.push(route) : () => handleClickServices}>
                            {text}
                        </button>
                    </li>
                )
            }
        </ul>
    )
}
