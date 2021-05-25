import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import EditUserPage from '../pages/EditUserPage';
import UserContext from '../UserContext';
import 'regenerator-runtime/runtime';

import '@testing-library/jest-dom/extend-expect';

test('Test edit user page', async () => {
    global.fetch = require('node-fetch');

    const {
        getAllByText,
        getByLabelText,
        findByText,
        asFragment,
        getByText,
    } = render(
        <UserContext.Provider value={{
            token: '124',
            role: 'admin',
            userId: 2,
            logout: () => {
            },
        }}>
            <MemoryRouter initialEntries={['/user/2/edit']}>
                <Switch>
                    <Route path="/user/:id/edit" component={EditUserPage}/>
                </Switch>
            </MemoryRouter>
        </UserContext.Provider>,
    );
    const footerText = getAllByText(/Loading.../i);
    expect(footerText)
        .toBeTruthy();

    expect(asFragment())
        .toMatchSnapshot();

    await findByText(/Confirm password: */);
    expect(asFragment())
        .toMatchSnapshot();
    const email = getByLabelText(/Email:/);
    fireEvent.change(email, { target: { value: 'abc@gmail.com' } });

    fireEvent.change(getByLabelText(/Password: */), { target: { value: 'pass' } });

    fireEvent.change(getByLabelText(/Confirm password: */), { target: { value: 'notPass' } });

    expect(getByText('Passwords do not match!'))
        .toBeInTheDocument();
    fireEvent.change(getByLabelText(/Confirm password: */), { target: { value: 'pass' } });

    userEvent.click(getByText(/Save/));
});
