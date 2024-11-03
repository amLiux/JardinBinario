import React, { useState } from 'react'
import dropdownStyles from './Dropdown.module.css';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';


type DropdownItems = {
    label: string;
    id: string;
    extraClass?: string;
    onClick: () => void;
}

type Props = {
    dropdownItems: DropdownItems[];
    title: string;
}

export const Dropdown = ({ dropdownItems, title }: Props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    return (
        <div className={dropdownStyles.container}>
            <div>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    type="button"
                    className={dropdownStyles.button}
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <span
                        className={dropdownStyles.title}
                    >
                        {title}
                    </span>
                    {
                        !showMenu 
                            ? <ChevronDownIcon className='text-gray-400 mt-1 -mr-1 h-5 w-5 text-white' />
                            : <ChevronUpIcon className='text-gray-400 mt-1 -mr-1 h-5 w-5 text-white' />
                    }
                </button>
            </div>
            <div
                className={`${!showMenu ? 'hidden' : 'absolute'} ${dropdownStyles.dropdownMenu}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
            >
                <div className="py-1" role="none">
                    {
                        dropdownItems.map(({ label, extraClass, id, onClick }) => (
                            <a
                                href='#'
                                className={`${dropdownStyles.dropdownItems} ${extraClass}`}
                                role="menuitem"
                                tabIndex={-1}
                                id={id}
                                onClick={() => {
                                    onClick();
                                    setShowMenu(!showMenu);
                                }}
                            >
                                {label}
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}