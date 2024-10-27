import Image from "next/legacy/image";
import { RefObject } from 'react';
import { CustomSwiper } from '@/components/Swiper';
import { ideas } from './ideas';
import ideasStyles from './Ideas.module.css';
import { Flexbox } from '../lib/Flexbox';

interface IdeasProps {
    refForScroll: RefObject<HTMLDivElement>;
}

export const Ideas = ({ refForScroll }: IdeasProps) => {
    return (
        <div id='ideas' ref={refForScroll}>
            <CustomSwiper
                title="Nuestras ideas:"
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
                                <a href={repoUrl}>Repositorio</a>
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
