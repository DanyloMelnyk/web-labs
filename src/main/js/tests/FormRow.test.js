import React from 'react';
import FormRow from '../components/FormRow';
import 'regenerator-runtime/runtime';
import { render } from '@testing-library/react';

test('Simple form row test', async () => {
    const {
        asFragment,
        findByText,
    } = render(
        <FormRow label="Test label" inputId="test-input" type="text"/>,
    );

    await findByText(/Test label/);

    expect(asFragment())
        .toMatchSnapshot();
});
