import { act } from 'react-dom/test-utils';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import UserContext from '../UserContext';
import '@testing-library/jest-dom/extend-expect';

import 'regenerator-runtime/runtime';
import LoginPage from '../pages/LoginPage';
import userEvent from '@testing-library/user-event';

test('Test login', async () => {
    global.fetch = require('node-fetch');

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
                <LoginPage/>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    await waitFor(() => expect(getByText('Sign in'))
        .toBeInTheDocument());

    act(() => {
        fireEvent.change(getByLabelText(/Password: */), { target: { value: 'pass' } });
        fireEvent.change(getByLabelText(/Username: */), { target: { value: 'testName' } });
    });

    const leftClick = { button: 0 };
    act(() => {
        userEvent.click(getByText('Sign In'), leftClick);
    });

    await waitFor(() => expect(queryByText('Loading...'))
        .toBeNull);

    expect(asFragment())
        .toMatchSnapshot();
});
