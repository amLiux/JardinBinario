import React from 'react';
import tagsStyles from './Tags.module.css';

interface TagsProps {
    tags: string[];
    preview?: boolean;
    column?: boolean;
}

export const Tags = ({ tags, preview, column }: TagsProps) => {
    return (
        <div className={`${tagsStyles.tagsContainer} ${preview ? 'mt-2' : ''} ${column ? 'flex flex-col' : ''}`}>
            {
                tags.map((tag, idx) =>
                    <span key={`${tag}-${idx}`} className={tagsStyles.tag}>#{tag}</span>
                )
            }
        </div>
    );
};