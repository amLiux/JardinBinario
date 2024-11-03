import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';

import indexNavbarOptionsStyles from './IndexNavbarOptions.module.css';
import { Flexbox } from '../lib/Flexbox';
import { Dropdown } from '../lib/Dropdown';
import useTranslation from 'next-translate/useTranslation';

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

export const IndexNavbarOptions = ({
  handleClickServices,
  privacy,
  read,
  burguer,
}: IndexNavbarOptionsProps) => {
  const { t, lang } = useTranslation('index');
  const router = useRouter();

  const tabs: Tab[] = [
    // {
    //     text: 'Blogs',
    //     route: '/blog',
    //     link: true,
    // },
    {
      text: t('navbar.links.privacy'),
      route: '/privacy',
      link: true,
    },
    {
      text: t('cta'),
      route: 'ticket',
      link: false,
    },
  ];

  const changeLanguage = (newLang:string) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;

    router.push({ pathname: currentPath, query: currentQuery }, currentPath, { locale: newLang });
  };
  
  if (read) {
    return null;
  }


  const dropdownItems = [
    {
      label: 'English',
      extraClass: "after:ml-2 after:content-['🇺🇸']",
      id: 'english-lang-option',
      onClick: () => changeLanguage('en')
    },
    {
      label: 'Spanish',
      extraClass: "after:ml-2 after:content-['🇨🇷']",
      id: 'spanish-lang-option',
      onClick: () => changeLanguage('es')
    }
  ];

  return (
    <Flexbox
      alignItems="center"
      html="ul"
      flexDirection={burguer ? 'column' : 'row'}
      extraClass={indexNavbarOptionsStyles.container}
    >
      <Dropdown dropdownItems={dropdownItems} title={t('navbar.links.language')} />
      {!privacy && tabs.map(({ text, link, route }, idx) => (
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
