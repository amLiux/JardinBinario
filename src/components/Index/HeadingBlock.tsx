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
}

interface HeadingProps {
    tag: Tag;
    children: ReactNode;
}

const Heading = ({tag, children}:HeadingProps) => {
    if(tag === 'h1') return <h1>{children}</h1>;
    if(tag === 'h2') return <h2>{children}</h2>;
    return null;
};

export const HeadingBlock = ({ heading, subheading, tag }: HeadingBlockProps) => {
    return (
        <>
            <Heading tag={tag}>
                {heading.firstPart}
                <span className={indexStyles.heading}>
                    {heading.highlight}
                </span>
                {heading.secondPart}
            </Heading>
            <p>{subheading}</p>
        </>
    );
};
