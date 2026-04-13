import Image from 'next/image';
import { useState } from 'react';
import styles from './PhotoComposition.module.css';

import imagen1 from '@/assets/imagen1.jpg';
import imagen2 from '@/assets/imagen2.jpg';
import imagen3 from '@/assets/imagen3.jpg';
import imagen4 from '@/assets/imagen4.jpg';

interface PhotoCompositionProps {
  t: (key: string) => string;
}

export const PhotoComposition = ({ t }: PhotoCompositionProps) => {
  const [hoveringPic, setHoveringPic] = useState<Record<number, boolean>>({});

  const toRender = [
    {
      image: imagen3,
      alt: 'design',
      overlayText: t('photoComposition.design'),
    },
    {
      image: imagen4,
      alt: 'socialMedia',
      overlayText: t('photoComposition.socialMedia'),
    },
    {
      image: imagen2,
      alt: 'uiUx',
      overlayText: t('photoComposition.uiUx'),
    },
    {
      image: imagen1,
      alt: 'software',
      overlayText: t('photoComposition.software'),
    },
  ];

  return (
    <div className={styles.container}>
      {toRender.map(({ image, alt, overlayText }, idx) => (
        <div key={idx} className={styles.composition}>
          <div
            className={styles.imageWrapper}
            onMouseEnter={() => setHoveringPic({ [idx]: true })}
            onMouseLeave={() => setHoveringPic({ [idx]: false })}
          >
            <Image
              src={image}
              alt={alt}
              className={styles.compositionPhoto}
              width={600}
              height={600}
              placeholder="blur"
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.overlay}>
              <div
                className={`${styles.overlayText} ${hoveringPic[idx] ? 'opacity-0' : 'opacity-100'
                  }`}
              >
                {overlayText}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};