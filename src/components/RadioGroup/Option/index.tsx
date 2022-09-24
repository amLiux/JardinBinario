import React from 'react'
import optionsStyles from './Option.module.css';
interface OptionProps {
    index: number;
    selectedIndexes: number[];
    onSelect: (index: number) => void;
    children: React.ReactNode;
}

export const Option = ({selectedIndexes, index, onSelect, children}: OptionProps) => {
    const isSelected = selectedIndexes.includes(index);

    return (
        <div
            className={`
                ${optionsStyles.button}
                ${isSelected && optionsStyles.selectedButton}
            `}
            onClick={() => onSelect(index)}
        >
            <div
                className={`
                    ${optionsStyles.radio} 
                    ${isSelected && optionsStyles.selectedRadio} 
                `}
            ></div>
            {children}
        </div>
    );
};
