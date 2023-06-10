import { NextRouter } from 'next/router';
import indexNavbarOptionsStyles from './IndexNavbarOptions.module.css';
import { Flexbox } from '../lib/Flexbox';

type Tab = {
    text: string;
    route: string;
    link: boolean;
    ctaButton?: boolean;
}

interface IndexNavbarOptionsProps {
    handleClickServices?: (ref: string) => void;
    router?: NextRouter;
}

const tabs: Tab[] = [
    // {
    //     text: 'Blog',
    //     route: '/blog',
    //     link: true,
    // },
    {
        text: 'Privacidad',
        route: '/privacy',
        link: true,
    },
    {
        text: 'Siembra algo genial',
        route: 'ticket',
        link: false,
        ctaButton: true,
    },
];

export const IndexNavbarOptions = ({ handleClickServices, router }: IndexNavbarOptionsProps) => {

    return (
        <ul className={indexNavbarOptionsStyles.container}>
            <Flexbox alignItems='center'>
            {
                tabs.map(({ text, link, route, ctaButton }, idx) =>
                    <li key={idx} className='mx-5'>
                        <button
                            className={`
                                ${ctaButton ? indexNavbarOptionsStyles.ctaButton : indexNavbarOptionsStyles.linkStyle}`
                            }
                            onClick={link ? () => router?.push(route) : () => handleClickServices ? handleClickServices(route) : undefined}>
                            {text}
                        </button>
                    </li>
                )
            }
            </Flexbox>
        </ul>
    );
};
