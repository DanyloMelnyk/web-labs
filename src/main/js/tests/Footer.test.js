import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';
import 'regenerator-runtime/runtime';

test('Footer test', async () => {
    const {
        asFragment,
        findByText,
    } = render(
        <Footer lab="123" date="24.05.2112"/>,
    );

    await findByText(/lab for Web technology and web design course./);

    expect(asFragment())
        .toMatchSnapshot();
});
