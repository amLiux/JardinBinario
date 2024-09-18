import { ArrowRightIcon as ArrowRight } from '@heroicons/react/24/outline';
import { Sky } from '../404/Sky';
import { CanvasBackground } from '../Canva';
import heroStyles from './Hero.module.css';
import { Flexbox } from '../lib/Flexbox';

export const Hero = () => {
  return (
    <div className={heroStyles.container}>
      <Sky stars={5} />
      <Flexbox alignItems='center' justifyContent='center' extraClass={heroStyles.flexContainer}>
        <Flexbox alignItems='center' justifyContent='between'  extraClass={heroStyles.contentContainer}>
          <CanvasBackground />
          <div className={heroStyles.textContainer}>
            <h1 className={heroStyles.header}>
              Trae tus ideas,{' '}
              <span className={heroStyles.gradientEffect}>
                cultivaremos
              </span>{' '}
              la solución.
            </h1>
            <p className={heroStyles.subHeading}>
              Nuestro equipo de talentosos expertos está listo para cultivar el
              éxito de tu proyecto. ¡Adéntrate en un jardín de creatividad
              tecnológica y déjate sorprender!
            </p>
            <button className={heroStyles.cta}>
              <a href='#ticket'>Siembra algo genial</a>
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
