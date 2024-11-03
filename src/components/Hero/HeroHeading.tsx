import React, { useEffect, useState } from 'react';
import heroStyles from './Hero.module.css';
import { Flexbox } from '../lib/Flexbox';

interface HeroHeadingProps {
  title: string;
  isMobile: boolean;
}

export const HeroHeading = ({ title, isMobile }: HeroHeadingProps) => {
  // const totalHovered = hoveredLetters.length;
  // const charsInTitleWOSpaces = title.split('').filter(char => char !== ' ');
  // const finished = totalHovered === charsInTitleWOSpaces.length;
  const [hoveredLetters, setHoveredLetters] = useState<number[]>([]);
  const [beingHovered, setBeingHovered] = useState<boolean>(false);
  const handleHover = (idx: number) => {
    if (!hoveredLetters.includes(idx)) {
      setBeingHovered(true);
      setHoveredLetters([...hoveredLetters, idx]);
    }
  };

  return (
    <div className={heroStyles.headingContainer}>
      <Flexbox
        extraClass="h-full"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <h1 className={heroStyles.heading}>
          {title.split('').map((letter, idx) => (
            <span
              onMouseLeave={() => setBeingHovered(false)}
              onMouseOver={letter !== ' ' ? () => handleHover(idx) : undefined}
              key={`letter-${idx}`}
              className={`
                ${heroStyles.letter}
                ${hoveredLetters.includes(idx) ? heroStyles.hovered : ''}
                ${beingHovered && hoveredLetters.at(-1) === idx ? heroStyles.activeHover : ''}
              `}
            >
              {letter}
            </span>
          ))}
        </h1>
        {/* {!isMobile && (
          <div className="text-white px-10 py-2">
            <p className="font-light text-xl">
              Nuestro equipo de talentosos expertos está listo para cultivar el
              éxito de tu proyecto. ¡Adéntrate en un jardín de creatividad
              tecnológica y déjate sorprender!
            </p>
          </div>
        )} */}
      </Flexbox>
    </div>
  );
};
