import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import UserContext from '../UserContext';
import '@testing-library/jest-dom/extend-expect';

import 'regenerator-runtime/runtime';
import userEvent from '@testing-library/user-event';
import SignUpPage from '../pages/SignUpPage';

test('Test sign up', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 403,
    });

    const {
        asFragment,
        getByText,
        getByLabelText,
        queryByText,
    } = render(
        <UserContext.Provider value={{
            token: '124',
            role: 'admin',
            userId: 2,
            logout: () => {
            },
        }}>
            <MemoryRouter>
                <SignUpPage/>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    await waitFor(() => expect(getByText('Sign up'))
        .toBeInTheDocument());

    act(() => {
        fireEvent.change(getByLabelText(/Password: */), { target: { value: 'pass' } });
        fireEvent.change(getByLabelText(/Username: */), { target: { value: 'testName' } });

        fireEvent.change(getByLabelText(/Email: */), { target: { value: 'a@g.om' } });
        fireEvent.change(getByLabelText(/Confirm password: */), { target: { value: 'notPass' } });
    });

    expect(getByText('Passwords do not match!'))
        .toBeInTheDocument();

    const leftClick = { button: 0 };

    act(() => {
        userEvent.click(getByText('Sign Up'), leftClick);
    });

    expect(asFragment())
        .toMatchSnapshot();

    act(() => {
        fireEvent.change(getByLabelText(/Confirm password: */), { target: { value: 'pass' } });
    });

    expect(queryByText('Passwords do not match!'))
        .toBeNull();

    act(() => {
        userEvent.click(getByText('Sign Up'), leftClick);
    });

    await waitFor(() => expect(getByText('Unknown error'))
        .toBeInTheDocument());

    expect(asFragment())
        .toMatchSnapshot();
});
