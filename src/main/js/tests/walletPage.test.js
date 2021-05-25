import { render } from '@testing-library/react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import UserContext from '../UserContext';
import WalletPage from '../pages/WalletPage';

import 'regenerator-runtime/runtime';

test('Test wallet page', async () => {
    global.fetch = require('node-fetch');

    const {
        asFragment,
        findByText,
        getAllByText,
    } = render(
        <UserContext.Provider value={{
            token: '124',
            role: 'admin',
            userId: 2,
            logout: () => {
            },
        }}>
            <MemoryRouter initialEntries={['/wallet/20']}>
                <Switch>
                    <Route exact path="/wallet/:id" component={WalletPage}/>
                </Switch>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    const footerText = getAllByText(/Loading.../i);
    expect(footerText)
        .toBeTruthy();

    await findByText(/Balance: */);

    expect(asFragment())
        .toMatchSnapshot();
});
