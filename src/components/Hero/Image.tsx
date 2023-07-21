import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import heroStyles from './Hero.module.css';
import { useHeroImage } from '@/hooks/useHeroImage';
import { Image as ImageType } from '@/types/sharedTypes';

const ImageComponent = ({ prompt, img, date }: ImageType) => {
    const { imageUrl, SIZE } = useHeroImage(img);
    return (
        imageUrl ? <div className={heroStyles.imageContainer}>
            <Image src={imageUrl} alt={`an ai generated image which has a ${prompt}`} width={SIZE} height={SIZE} />
            <div className={heroStyles.imageDescriptionContainer}>
                <div className={heroStyles.description}>
                    <p className={heroStyles.prompt}>{`"${prompt}"`}</p>
                    <span className={heroStyles.date}>{new Date(date).toLocaleDateString('ES-es')}</span>
                </div>
                <hr className={heroStyles.line} />
                <p className={heroStyles.copy}>Esta imagen fue generada utilizando el API de
                    <Link href="https://openai.com/dall-e-2">
                        <a className={heroStyles.link}>DALL-E2®</a>
                    </Link>
                    por uno de nuestros usuarios.
                </p>
            </div>
        </div> : null
    );
};

export default ImageComponent;