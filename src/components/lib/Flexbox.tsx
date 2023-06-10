import { BasicObject, KeyOfBasicObject } from '@/types/sharedTypes';
import React, { ReactNode } from 'react';

interface FlexboxProps {
    children: ReactNode;
    extraClass?: string;
    justifyContent?: KeyOfBasicObject;
    alignItems?: KeyOfBasicObject;
    flexDirection?: 'row' | 'column';
    wrap?: boolean;
    html?: string;
    id?: string;
    onClick?: () => void;
}

interface WrapperProps {
    html: keyof Record<string, any>, 
    className: string,
    id: string | undefined,
    children:ReactNode;
}

export const Flexbox = ({
    children,
    extraClass = '',
    alignItems = '',
    justifyContent = 'space-between',
    flexDirection = 'row',
    wrap = false,
    html = 'div',
    id = undefined,
    onClick,
}: FlexboxProps) => {
    const classNameGenerator = (classToAdd: string): string => {
        const flexDirectionClass = flexDirection === 'column' ? 'flex-col' : '';
        const justifyContentClass: BasicObject = {
            center: 'justify-center',
            'space-between': 'justify-between',
            start: 'justify-start',
            'space-around': 'justify-around',
            evenly: 'justify-evenly',
        };
        const alignItemsClass: BasicObject = {
            center: 'items-center'
        };
        return `flex ${wrap ? 'flex-wrap' : ''} ${flexDirectionClass} ${justifyContentClass[justifyContent]} ${alignItemsClass?.[alignItems]} ${classToAdd}`.trim();
    };

    const className = classNameGenerator(extraClass);

    const propsToPass = {
        id,
        className,
        onClick: onClick ? onClick : undefined,
    };

    const types: Record<string, any> = {
        div: <div {...propsToPass}>{children}</div>,
        ul: <ul {...propsToPass}>{children}</ul>,
        span: <span {...propsToPass}>{children}</span>
    };

    const Element = types[html];

    return Element;
};
