import { ReactNode } from 'react';
import indexStyles from './Index.module.css';

type Tag = 'h1' | 'h2' | 'h3';

type Block = {
    heading?: {
        firstPart: string;
        highlight: string;
        secondPart: string;
    };
    subheading: string;
    link?: {
        toWrap: string;
        link: string;
    }
}

interface HeadingBlockProps {
    block: Block;
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

export const HeadingBlock = ({ block, tag, headingAnimationDirection = undefined, subheadingAnimationDirection = undefined }: HeadingBlockProps) => {
    const { heading, subheading, link } = block;
    return (
        <header className={indexStyles.headingContainer}>
            { (tag && heading) && 
                <Heading className={headingAnimationDirection ? indexStyles[`animation${headingAnimationDirection}`] : ''} tag={tag}>
                    {heading.firstPart}
                    <span className={indexStyles.headingEffect}>
                        {heading.highlight}
                    </span>
                    {heading.secondPart}
                </Heading>
            }
            <p 
                className={
                    subheadingAnimationDirection
                        ? `${indexStyles[`animation${subheadingAnimationDirection}`]}  ${indexStyles.blocksText}`
                        : indexStyles.blocksText
                }
                dangerouslySetInnerHTML={
                    link
                    ? {__html: subheading.replace(link.toWrap, `<a rel='noopener noreferrer' target='_blank' href='${link.link}'>${link.toWrap}</a>`)}
                    : undefined
                }
            >
                {link ? undefined : subheading}
            </p>
        </header>
    );
};
