import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Route, Switch } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import 'regenerator-runtime/runtime';

import UsersPage from '../pages/UsersPage';
import UserContext from '../UserContext';

test('Test user page', async () => {
    global.fetch = require('node-fetch');

    const {
        asFragment,
        findAllByText,
        queryByText,
    } = render(
        <UserContext.Provider value={{
            token: '124',
            role: 'admin',
            userId: 2,
            logout: () => {
            },
        }}>
            <MemoryRouter initialEntries={['/user/2']}>
                <Switch>
                    <Route exact path="/user/:id" component={UsersPage}/>
                </Switch>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    await waitFor(() => expect(queryByText('Loading...'))
        .toBeNull);

    await findAllByText(/First name:/);

    expect(asFragment())
        .toMatchSnapshot();
    await findAllByText(/First name:/);
});
