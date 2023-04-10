import Image from 'next/image';
import { RefObject } from 'react';
import { CustomSwiper } from '@/components/Swiper';
import { ideas } from './ideas';
import servicesStyles from './Services.module.css';

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
                        <div key={cardIdx} className={servicesStyles.card}>
                            <div className={servicesStyles.cardTextContainer}>
                                <h4>{title}</h4>
                                <p>{description}</p>
                                <a href={repoUrl}>Repositorio</a>
                            </div>
                            <div className={servicesStyles.logosContainer}>
                                {stack && stack.map(({ logo, alt }, idx) =>
                                    // TODO shall we keep stacks? or we add something different?
                                    <span key={idx} className={servicesStyles.logo}>
                                        <Image src={logo} width={48} height={48} alt={alt} />
                                    </span>
                                )}
                            </div>
                        </div>

                    )
                }
            </CustomSwiper>
        </div>

    );
};
