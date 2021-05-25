import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import UserContext from '../UserContext';
import WalletsPage from '../pages/WalletsPage';
import '@testing-library/jest-dom/extend-expect';

import 'regenerator-runtime/runtime';

test('Test wallets page', async () => {
    global.fetch = require('node-fetch');

    const {
        asFragment,
        getByText,
        getAllByText,
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
                <WalletsPage/>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    const footerText = getAllByText(/Loading.../i);
    expect(footerText)
        .toBeTruthy();

    await waitFor(() => expect(queryByText('Loading...'))
        .toBeNull);

    await waitFor(() => expect(getByText('My profile'))
        .toBeInTheDocument());

    expect(asFragment())
        .toMatchSnapshot();
});
