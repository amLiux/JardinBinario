import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Message } from '../../components/Message';

describe('<Message/>', () => {
    let component;
    const testMessage = 'hello, this is all a test';
    const handleClose = jest.fn(() => 'he');
    
    beforeEach(() => {
        component = render(<Message handleClose={handleClose} message={testMessage}/>);
    });

    test('should render the component', () => {
        expect(component.getByText(testMessage)).toBeTruthy();
    });

    test('should call the onClose mock', () => {
        const [toClick] = component.container.getElementsByClassName('messageClose');

        fireEvent.click(toClick);
        expect(handleClose).toHaveBeenCalled();
    });

});