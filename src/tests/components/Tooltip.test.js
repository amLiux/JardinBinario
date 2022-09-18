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

    test.skip('should contain the inline className', () => {
        //TODO we removed the inline class from the component, need to check later how to check if it has been rendered
        expect(component.container.getElementsByClassName('inline').length).toBe(1);
    });

    test.skip('should show and hide the tooltip on mouseEnter and mouseLeave', () => {
        //TODO we removed the inline class from the component, need to check later how to check if it has been rendered
        const [toHoverOver] = component.container.getElementsByClassName('inline');
        fireEvent.mouseEnter(toHoverOver);
        const tooltip = component.getByText(tooltipText);
        expect(tooltip).toBeInTheDocument();
        fireEvent.mouseLeave(toHoverOver);
        expect(tooltip).not.toBeInTheDocument();
    });

});