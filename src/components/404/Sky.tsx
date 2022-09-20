import React from 'react'
import { Star } from './Star';

type SkyProps = {
    stars: number;
    newsletter?: boolean;
}

export const Sky = ({ stars, newsletter = false }: SkyProps) => {
    const arrayForRendering = (amountOfStars: number) => [...Array(amountOfStars)];

    return (
        <div className={`${newsletter ? 'absolute' : ''} flex flex-col`}>
            <div>
                {
                    arrayForRendering(stars).map((val, ind) => <Star key={ind} />)
                }
            </div>
        </div>
    )
}