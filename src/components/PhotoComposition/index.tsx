import Image from "next/legacy/image";

import imagen1 from '@/assets/imagen1.jpg';
import imagen2 from '@/assets/imagen2.jpg';
import imagen3 from '@/assets/imagen3.jpg';
import imagen4 from '@/assets/imagen4.jpg';

import photoCompositionStyles from './PhotoComposition.module.css';
import { Fragment, useState } from 'react';

const toRender = [
  {
    image: imagen3,
    alt: 'a desk with some work on branding design with an iPad',
    overlayText: 'Diseño',
  },
  {
    image: imagen4,
    alt: 'a desk with some work on branding design with an iPad',
    overlayText: 'Social Media',
  },
  {
    image: imagen2,
    alt: 'mobile application interface sketches',
    overlayText: 'UI/UX',
  },
  {
    image: imagen1,
    alt: 'someone coding on a laptop with a cup on coffee and a plant on the desk',
    overlayText: 'Software',
  },
];

export const PhotoComposition = () => {
  const [hoveringPic, setHoveringPic] = useState<Record<string, boolean>>({});

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
