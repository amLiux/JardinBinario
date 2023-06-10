import { ReactNode } from 'react';
import indexStyles from './Index.module.css';

type Tag = 'h1' | 'h2' | 'h3';

type Block = {
    heading?: {
        firstPart?: string;
        highlight: string;
        secondPart?: string;
    };
    subheading: string;
    link?: {
        toWrap: string;
        link: string;
    }[];
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
    if (tag === 'h3') return <h3 {...sharedClassName}>{children}</h3>;

    return null;
};

const replaceLinksRefs = (link: Block['link'], subheading: Block['subheading']) => {
    link?.forEach(
        (loopedLink:any) => {
            subheading = subheading?.replaceAll(loopedLink.toWrap, `<a rel='noopener noreferrer' target='_blank' href='${loopedLink.toWrap.includes('@') ? 'mailto:' : ''}${loopedLink.link}'>${loopedLink.toWrap}</a>`);
        }
    );
    return subheading;
};

export const HeadingBlock = ({ block, tag, headingAnimationDirection = undefined, subheadingAnimationDirection = undefined }: HeadingBlockProps) => {
    const { heading, subheading, link } = block;
    const linkRender = link && {
        __html: replaceLinksRefs(link, subheading)
    };
    return (
        <header>
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
                dangerouslySetInnerHTML={linkRender}
            >
                {link ? undefined : subheading}
            </p>
        </header>
    );
};
