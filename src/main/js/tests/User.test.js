import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import User from '../components/User';
import 'regenerator-runtime/runtime';

test('User test', async () => {
    const user = {
        username: 'Test',
        firstName: '1st name',
        lastName: 'last name',
        email: 'teset@gmail.com',
        phone: '123456789',
        role: 'test',
    };

    const {
        asFragment,
        findByText,
    } = render(
        <MemoryRouter>
            <User user={user} deleteUser={() => {
                user.username = 'Deleted';
            }}/>,
        </MemoryRouter>,
    );

    await findByText('First name:');

    expect(asFragment())
        .toMatchSnapshot();
});
