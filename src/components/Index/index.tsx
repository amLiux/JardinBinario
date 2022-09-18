import React, { RefObject, useRef } from 'react'
import { PhotoComposition } from '../PhotoComposition';
import { Services } from '../Services';
import indexStyles from './Index.module.css';
import { texts } from './text';

interface IndexProps {
    refForScroll: RefObject<HTMLDivElement>;
}

export const Index = ({refForScroll}:IndexProps) => {
    return (
        <div className={indexStyles.index}>
            <h1>Artesanía convertida en <span className={indexStyles.heading}>tecnología</span> que cosechan tus ideas</h1>
            <span className='text-center'>{texts.subheading}</span>
            <PhotoComposition />
            <h2 className='mt-0'>{texts.heading2}</h2>
            <span className='text-center'>{texts.subheading2}</span>

            <h3 className='mt-0'>{texts.heading3}</h3>

            <Services ref={refForScroll} />
        </div>
    )
}
