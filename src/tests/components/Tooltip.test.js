import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import { Tooltip } from '../../components/Tooltip';

describe('<Tooltip/>', () => {
    let component;
    const testId = 'test';
    const tooltipText = 'test text';

    beforeEach(() => {
        const testChildren = <div data-testid={testId}></div>;
        component = render(<Tooltip tooltipText={tooltipText}>{testChildren}</Tooltip>);
    });

    test('should render the children component prop that we pass', () => {
        expect(component.getByTestId(testId)).toBeTruthy();
    });

    test('should contain the inline className', () => {
        expect(component.container.getElementsByClassName('inline').length).toBe(1);
    });

    test('should show and hide the tooltip on mouseEnter and mouseLeave', () => {
        const [toHoverOver] = component.container.getElementsByClassName('inline');
        fireEvent.mouseEnter(toHoverOver);
        const tooltip = component.getByText(tooltipText);
        expect(tooltip).toBeInTheDocument();
        fireEvent.mouseLeave(toHoverOver);
        expect(tooltip).not.toBeInTheDocument();
    });

});