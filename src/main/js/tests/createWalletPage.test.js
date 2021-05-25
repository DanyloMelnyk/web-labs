import { act } from 'react-dom/test-utils';

import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import UserContext from '../UserContext';
import '@testing-library/jest-dom/extend-expect';

import 'regenerator-runtime/runtime';
import WalletCreatingPage from '../pages/WalletCreatingPage';

test('Test wallets page', async () => {
    global.fetch = require('node-fetch');

    const {
        asFragment,
        getByText,
        getByLabelText,
    } = render(
        <UserContext.Provider value={{
            token: '124',
            role: 'admin',
            userId: 2,
            logout: () => {
            },
        }}>
            <MemoryRouter>
                <WalletCreatingPage/>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    await waitFor(() => expect(getByText('Wallet name: *'))
        .toBeInTheDocument());

    expect(asFragment())
        .toMatchSnapshot();

    act(() => {
        fireEvent.change(getByLabelText(/Wallet name: */), { target: { value: 'Tessst name' } });
        fireEvent.change(getByLabelText(/Currency:/), { target: { value: 'EUR' } });
    });

    expect(asFragment())
        .toMatchSnapshot();
});
