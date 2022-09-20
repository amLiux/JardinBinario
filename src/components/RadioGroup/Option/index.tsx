import React from 'react'

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
            className={
                `border-2 delay-200 flex items-center gap-1 shadow cursor-pointer transition duration-300 bg-gray-200 mx-1 rounded-md p-2 py-3 flex-1 text-base font-bold text-slate-600 lg:font-normal lg:text-sm hover:shadow-lg 
                ${isSelected && "border-2 border-purple-500"}`
            }
            onClick={() => onSelect(index)}
        >
            <div
                className={
                    `rounded-full w-4 h-4 transition delay-200 border-4 
                    ${isSelected ? "border-purple-500 bg-purple-300" : 'border-gray-400 bg-white'} `
                }
            ></div>
            {children}
        </div>
    );
};
