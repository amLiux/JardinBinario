import { ReactNode } from 'react';
import indexStyles from './Index.module.css';

type Tag = 'h1' | 'h2';

interface HeadingBlockProps {
    heading: {
        firstPart: string;
        highlight: string;
        secondPart: string;
    };
    subheading: string;
    tag: Tag;
    headingAnimationDirection?: 'Left' | 'Right';
    subheadingAnimationDirection?: 'Left' | 'Right';
}

interface HeadingProps {
    tag: Tag;
    children: ReactNode;
    className: string;
}

const Heading = ({ tag, children, className }: HeadingProps) => {
    const sharedClassName = { className };
    if (tag === 'h1') return <h1 {...sharedClassName}>{children}</h1>;
    if (tag === 'h2') return <h2 {...sharedClassName}>{children}</h2>;
    return null;
};

export const HeadingBlock = ({ heading, subheading, tag, headingAnimationDirection = undefined, subheadingAnimationDirection = undefined }: HeadingBlockProps) => {
    return (
        <header className={indexStyles.headingContainer}>
            <Heading className={headingAnimationDirection ? indexStyles[`animation${headingAnimationDirection}`] : ''} tag={tag}>
                {heading.firstPart}
                <span className={indexStyles.headingEffect}>
                    {heading.highlight}
                </span>
                {heading.secondPart}
            </Heading>
            <p className={subheadingAnimationDirection ? indexStyles[`animation${subheadingAnimationDirection}`] : ''} >{subheading}</p>
        </header>
    );
};
