import renderer from 'react-test-renderer';
import React from 'react';
import Card from '../components/Card';

test('Wallet test', () => {
    const component = renderer.create(
        <Card title="test"/>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
