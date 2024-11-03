import Image from 'next/legacy/image';

import imagen1 from '@/assets/imagen1.jpg';
import imagen2 from '@/assets/imagen2.jpg';
import imagen3 from '@/assets/imagen3.jpg';
import imagen4 from '@/assets/imagen4.jpg';

import photoCompositionStyles from './PhotoComposition.module.css';
import { Fragment, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

interface PhotoCompositionProps {
  t: (key: string) => string;
}

export const PhotoComposition = ({ t }: PhotoCompositionProps) => {
  const [hoveringPic, setHoveringPic] = useState<Record<string, boolean>>({});

  const toRender = [
    {
      image: imagen3,
      alt: 'a desk with some work on branding design with an iPad',
      overlayText: t('photoComposition.design'),
    },
    {
      image: imagen4,
      alt: 'a desk with some work on branding design with an iPad',
      overlayText: t('photoComposition.socialMedia'),
    },
    {
      image: imagen2,
      alt: 'mobile application interface sketches',
      overlayText: t('photoComposition.uiUx'),
    },
    {
      image: imagen1,
      alt: 'someone coding on a laptop with a cup on coffee and a plant on the desk',
      overlayText: t('photoComposition.software'),
    },
  ];

  return (
    <>
      <div className={photoCompositionStyles.container}>
        {toRender.map(({ image, alt, overlayText }, idx) => (
          <Fragment key={`${alt}-${idx}`}>
            <div className={photoCompositionStyles.composition}>
              <Image
                onMouseOver={() => setHoveringPic({ [idx]: true })}
                onMouseLeave={() => setHoveringPic({ [idx]: false })}
                key={idx}
                className={photoCompositionStyles.compositionPhoto}
                alt={alt}
                src={image}
                width={400}
                height={400}
                objectFit="cover"
              />
              <div className={photoCompositionStyles.overlay}>
                <div
                  className={`${photoCompositionStyles.overlayText} ${hoveringPic[idx] ? 'transition duration-500 opacity-0' : ''}`}
                >
                  {overlayText}
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
