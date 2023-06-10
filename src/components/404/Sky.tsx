import { Flexbox } from '../lib/Flexbox';
import { Star } from './Star';

type SkyProps = {
    stars: number;
    newsletter?: boolean;
}

export const Sky = ({ stars, newsletter = false }: SkyProps) => {
    const arrayForRendering = (amountOfStars: number) => [...Array(amountOfStars)];

    return (
        <Flexbox extraClass={`${newsletter ? 'absolute' : ''}`} flexDirection='column'>
            <div>
                {
                    arrayForRendering(stars).map((_, ind) => <Star key={ind} />)
                }
            </div>
        </Flexbox>
    );
};
