import { BasicObject, KeyOfBasicObject } from '@/types/sharedTypes';
import React, { ReactNode } from 'react';

interface FlexboxProps {
    children: ReactNode;
    extraClass?: string;
    justifyContent?: KeyOfBasicObject;
    alignItems?: KeyOfBasicObject;
    flexDirection?: 'row' | 'column';
}

export const Flexbox = ({
    children,
    extraClass = '',
    alignItems = '',
    justifyContent = 'space-between',
    flexDirection = 'row'
}:FlexboxProps) => {
    const classNameGenerator = (classToAdd:string):string => {
        const flexDirectionClass = flexDirection === 'column' ? 'flex-col' : '';
        const justifyContentClass:BasicObject = {
            center: 'justify-center',
            'space-between': 'justify-between',
            start: 'justify-start',
            'space-around': 'justify-around',
        };
        const alignItemsClass: BasicObject = {
            center: 'items-center'
        };
        return `flex ${flexDirectionClass} ${justifyContentClass[justifyContent]} ${alignItemsClass?.[alignItems]} ${classToAdd}`.trim();
    };
  return (
    <div className={classNameGenerator(extraClass)}>
        {children}
    </div>
  );
};
