import React from 'react';
import navbarStyles from './Navbar.module.css';
interface CompletionBarProps {
    completion: number;
    read: boolean;
}

export const CompletionBar = ({completion, read}:CompletionBarProps) => {

    if(!read || Number.isNaN(completion)) {
        return null;
    }

    return (
        <span
            style={{ transform: `translateX(${completion - 100}%)` }}
            className={navbarStyles.completion}
        />
    );
};

