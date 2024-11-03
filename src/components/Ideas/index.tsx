import { RefObject } from 'react';
import Image from 'next/legacy/image';
import useTranslation from 'next-translate/useTranslation';

import { CustomSwiper } from '@/components/Swiper';
import { Flexbox } from '@/lib/Flexbox';

import { useIdeas } from './ideas';
import ideasStyles from './Ideas.module.css';

interface IdeasProps {
    refForScroll: RefObject<HTMLDivElement>;
    t: (key: string) => string;
}

export const Ideas = ({ refForScroll, t }: IdeasProps) => {
    const {ideas} = useIdeas(t);
    return (
        <div id='ideas' ref={refForScroll}>
            <CustomSwiper
                headerText={{
                    title: t('swiper.header.title'),
                    highlight: t('swiper.header.highlight'),
                }}
                slidesPerView={{
                    default: 1,
                    640: 1,
                    768: 1,
                    1024: 2,
                }}
                autoplay
            >
                {
                    ideas.map(({ title, description, stack, repoUrl }, cardIdx) =>
                        <div key={cardIdx} className={ideasStyles.card}>
                            <div className={ideasStyles.cardTextContainer}>
                                <h4>{title}</h4>
                                <p>{description}</p>
                                <a href={repoUrl}>{t('ideas.repo')}</a>
                            </div>
                            <div className={ideasStyles.logosContainer}>
                                {stack && stack.map(({ logo, alt }, idx) =>
                                    // TODO shall we keep stacks? or we add something different?
                                    <Flexbox key={idx} alignItems='center' extraClass={ideasStyles.logo}>
                                        <Image src={logo} width={48} height={48} alt={alt} />
                                    </Flexbox>
                                )}
                            </div>
                        </div>

                    )
                }
            </CustomSwiper>
        </div>

    );
};
