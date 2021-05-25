import { render } from '@testing-library/react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import UserContext from '../UserContext';

import 'regenerator-runtime/runtime';
import UserPage from '../pages/UserPage';

test('Test wallet page', async () => {
    global.fetch = require('node-fetch');

    const {
        asFragment,
        findAllByText,
        getAllByText,
    } = render(
        <UserContext.Provider value={{
            token: '124',
            role: 'admin',
            userId: 2,
            logout: () => {
            },
        }}>
            <MemoryRouter initialEntries={['/user/8']}>
                <Switch>
                    <Route exact path="/user/:id" component={UserPage}/>
                </Switch>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    const footerText = getAllByText(/Loading.../i);
    expect(footerText)
        .toBeTruthy();

    await findAllByText(/user6/);

    expect(asFragment())
        .toMatchSnapshot();
});
