import { render } from '@testing-library/react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import UserContext from '../UserContext';
import TransactionPage from '../pages/TransactionPage';
import 'regenerator-runtime/runtime';

test('Test transaction page', async () => {
    global.fetch = require('node-fetch');

    const {
        asFragment,
        findByText,
    } = render(
        <UserContext.Provider value={{
            token: '124',
            role: 'admin',
            userId: 2,
            logout: () => {
            },
        }}>
            <MemoryRouter initialEntries={['/wallet/2/send']}>
                <Switch>
                    <Route exact path="/wallet/:id/send" component={TransactionPage}/>
                </Switch>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    await findByText(/Recipient wallet id: */);

    expect(asFragment())
        .toMatchSnapshot();
});
