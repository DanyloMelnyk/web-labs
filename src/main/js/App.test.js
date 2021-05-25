import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Switch } from 'react-router-dom';
import 'regenerator-runtime/runtime';

import App from './App';
import UserContext from './UserContext';
import PrivateRoute from './components/PrivateRoute';
import EditWalletPage from './pages/EditWalletPage';

const leftClick = { button: 0 };

test('Test unauthorized app', () => {
    const {
        getByText,
        getByLabelText,
    } = render(<App/>);
    const footerText = getByText(/lab for Web/i);
    expect(footerText)
        .toBeInTheDocument();

    userEvent.click(getByText('Sign Up'), leftClick);
    expect(getByText(/Confirm password:/i))
        .toBeInTheDocument();

    fireEvent.change(getByLabelText(/Password: */), { target: { value: 'pass' } });
    fireEvent.change(getByLabelText(/Username: */), { target: { value: 'testName' } });
    fireEvent.change(getByLabelText(/Email: */), { target: { value: 'a@gmail.com' } });
    fireEvent.change(getByLabelText(/Confirm password: */), { target: { value: 'notPass' } });

    expect(getByText(/Passwords do not match!/i))
        .toBeInTheDocument();
});

test('Test edit wallet page', async () => {
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
            <MemoryRouter initialEntries={['/wallet/20/edit']}>
                <Switch>
                    <PrivateRoute exact path="/wallet/:id/edit" component={EditWalletPage}/>
                </Switch>
            </MemoryRouter>
        </UserContext.Provider>,
    );

    expect(getAllByText(/Loading.../i))
        .toBeTruthy();

    expect(asFragment())
        .toMatchSnapshot();

    await findByText(/Wallet name: */);
    expect(asFragment())
        .toMatchSnapshot();

    fireEvent.change(getByLabelText(/Wallet name: */), { target: { value: 'Test 11' } });
    fireEvent.change(getByLabelText(/Currency:/), { target: { value: 'EUR' } });
    fireEvent.change(getByLabelText(/Balance:/), { target: { value: '100' } });

    userEvent.click(getByText(/Save/));
});
