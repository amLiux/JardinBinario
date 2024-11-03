import { ArrowRightIcon as ArrowRight } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import { Sky } from '../404/Sky';
import { CanvasBackground } from '../Canva';
import heroStyles from './Hero.module.css';
import { Flexbox } from '../lib/Flexbox';
import indexStyles from '../Index/Index.module.css';

export const Hero = () => {
  const { t } = useTranslation('index');
  return (
    <div className={heroStyles.container}>
      <Sky stars={5} />
      <Flexbox alignItems='center' justifyContent='center' extraClass={heroStyles.flexContainer}>
        <Flexbox alignItems='center' justifyContent='between'  extraClass={heroStyles.contentContainer}>
          <CanvasBackground />
          <div className={heroStyles.textContainer}>
            <h1 className={heroStyles.header}>
              {t('hero.heading.part1')}{' '}
              <span className={indexStyles.headingEffect}>
                {t('hero.heading.gradient')}
              </span>{' '}
              {t('hero.heading.part2')}
            </h1>
            <p className={heroStyles.subHeading}>
              {t('hero.subheading')}
            </p>
            <button className={heroStyles.cta}>
              <a href='#ticket'>{t('cta')}</a>
              <ArrowRight className={heroStyles.ctaIcon} />
            </button>
          </div>
          <div className={heroStyles.planetContainer}>
            <div className={heroStyles.blinkingPlanet}></div>
          </div>
        </Flexbox>
      </Flexbox>
    </div>
  );
};
