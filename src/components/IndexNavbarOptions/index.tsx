import { NextRouter } from 'next/router';
import indexNavbarOptionsStyles from './IndexNavbarOptions.module.css';
import { Flexbox } from '../lib/Flexbox';
import Link from 'next/link';

type Tab = {
  text: string;
  route: string;
  link: boolean;
};

interface IndexNavbarOptionsProps {
  handleClickServices?: (ref: string) => void;
  router?: NextRouter;
  burguer?: boolean;
  privacy: boolean;
  read: boolean;
}

const tabs: Tab[] = [
  // {
  //     text: 'Blogs',
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
  },
];

export const IndexNavbarOptions = ({
  handleClickServices,
  privacy,
  read,
  burguer,
}: IndexNavbarOptionsProps) => {
  if (privacy || read) {
    return null;
  }

  return (
    <Flexbox
      alignItems="center"
      html="ul"
      flexDirection={burguer ? 'column' : 'row'}
      extraClass={indexNavbarOptionsStyles.container}
    >
      {tabs.map(({ text, link, route }, idx) => (
        <li key={idx} className="mx-5">
          {link
            ? <Link
              href={route}
              passHref={false}
              className={indexNavbarOptionsStyles.linkStyle}
              scroll={false}>
              {text}
            </Link>
            : <button
              className={indexNavbarOptionsStyles.ctaButton}
              onClick={() => handleClickServices ? handleClickServices(route) : undefined}
            >
              {text}
            </button>}
        </li>
      ))}
    </Flexbox>
  );
};
