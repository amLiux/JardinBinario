import React from 'react'
import { Star } from './Star';

type SkyProps = {
    stars: number;
}

export const Sky = ({ stars }: SkyProps) => {
    const arrayForRendering = (amountOfStars:number) => [...Array(amountOfStars)];

    return (
        <div className="flex flex-col">
            <div>
                {
                    arrayForRendering(stars).map((val, ind) => <Star key={ind} />)
                }
            </div>
        </div>
    )
}