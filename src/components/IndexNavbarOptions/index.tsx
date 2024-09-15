import { NextRouter } from 'next/router';
import indexNavbarOptionsStyles from './IndexNavbarOptions.module.css';
import { Flexbox } from '../lib/Flexbox';

type Tab = {
  text: string;
  route: string;
  link: boolean;
  ctaButton?: boolean;
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

export const IndexNavbarOptions = ({
  handleClickServices,
  router,
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
      {tabs.map(({ text, link, route, ctaButton }, idx) => (
        <li key={idx} className="mx-5">
          <button
            className={`
                                ${ctaButton ? indexNavbarOptionsStyles.ctaButton : indexNavbarOptionsStyles.linkStyle}`}
            onClick={
              link
                ? () => router?.push(route)
                : () =>
                    handleClickServices ? handleClickServices(route) : undefined
            }
          >
            {text}
          </button>
        </li>
      ))}
    </Flexbox>
  );
};
