import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Layout } from '../../components/Layout';

describe('<Layout/>', () => {
    const testId = 'testId';

    const AuthClient = jest.requireActual('../../apollo/AuthClient');
    const hookSpy = jest.spyOn(AuthClient, 'useAuth');

    test.skip('should render the children component prop that we pass and call the withAuth hook', () => {
        hookSpy.mockImplementation(() => ({
            message: {
                msg: '',
                error: false,
            },
            removeMessage: () => { },
        }));

        const component = render(
            <Layout>
                <div data-testid={testId}></div>
            </Layout>
        );

        expect(component.getByTestId(testId)).toBeTruthy();
        expect(hookSpy).toHaveBeenCalled();
    });

    test.skip('should render an error message if the message is an error', () => {
        const errorMessage = 'Error in Jest.'
        hookSpy.mockImplementation(() => ({
            message: {
                msg: errorMessage,
                error: true,
            },
            removeMessage: () => { },
        }));

        const component = render(
            <Layout>
                <div data-testid={testId}></div>
            </Layout>
        );

        expect(component.getByText(errorMessage)).toBeTruthy();
        expect(component.container.getElementsByClassName('bg-red-500')).toHaveLength(1);
        expect(hookSpy).toHaveBeenCalled();

    });

    test.skip('should render a warning message if the message is a warning', () => {
        const warningMessage = 'Warning in Jest.'
        hookSpy.mockImplementation(() => ({
            message: {
                msg: warningMessage,
                warning: true,
            },
            removeMessage: () => { },
        }));

        const component = render(
            <Layout>
                <div data-testid={testId}></div>
            </Layout>
        );

        expect(component.getByText(warningMessage)).toBeTruthy();
        expect(component.container.getElementsByClassName('bg-yellow-500')).toHaveLength(1);
        expect(hookSpy).toHaveBeenCalled();

    });

    test.skip('should render a success message if the message is a success', () => {
        const successMessage = 'Sucess in Jest.'
        hookSpy.mockImplementation(() => ({
            message: {
                msg: successMessage,
            },
            removeMessage: () => { },
        }));

        const component = render(
            <Layout>
                <div data-testid={testId}></div>
            </Layout>
        );

        expect(component.getByText(successMessage)).toBeTruthy();
        expect(component.container.getElementsByClassName('bg-green-500')).toHaveLength(1);
        expect(hookSpy).toHaveBeenCalled();
    });

    test.skip('should call the removeMessage function if we click on the close icon', async () => {
        const removeMessage = jest.fn(() => { });
        const successMessage = 'Sucess in Jest.'
        hookSpy.mockImplementation(() => ({
            message: {
                msg: successMessage,
            },
            removeMessage: removeMessage,
        }));

        const component = render(
            <Layout>
                <div data-testid={testId}></div>
            </Layout>
        );

        jest.useFakeTimers();
        const closeButton = component.getByRole('button');
        fireEvent.click(closeButton);
        jest.runOnlyPendingTimers();
        expect(removeMessage).toHaveBeenCalled();
    });

    test.skip('should render the 404 style', () => {
        const component = render(
            <Layout style404>
                <div data-testid={testId}></div>
            </Layout>
        );

        expect(component.container.getElementsByClassName('bg404Pattern')).toHaveLength(1);
    });

});