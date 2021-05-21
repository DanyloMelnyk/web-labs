import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { postRequest } from '../common';
import FormRow from '../components/FormRow';
import Card from '../components/Card';
import UserContext from '../UserContext';

const React = require('react');

function WalletCreatingPage({
    history,
}) {
    const [name, setName] = useState();
    const [currency, setCurrency] = useState('USD');

    const { token } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        postRequest('wallet/',
            () => {
                history.push('/');
            },
            () => null,
            {
                walletName: name,
                currency,
            }, token);
    };

    return (
        <main>
            <Card>
                <form onSubmit={handleSubmit}>
                    <FormRow label="Wallet name: *" inputId="wallet-name"
                        onChange={(e) => setName(e.target.value)}
                        name="wallet-name" required type="text"/>

                    <FormRow label="Currency:" inputId="currency" rest={null}>
                        <select onChange={(e) => setCurrency(e.target.value)} id="currency"
                            name="currency">
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="UAH">UAH</option>
                        </select>
                    </FormRow>

                    <div className="row">
                        <input type="submit" value="Create"/>
                        <input type="reset" value="Cancel"/>
                    </div>
                </form>
            </Card>
        </main>
    );
}

WalletCreatingPage.propTypes = {
    history: PropTypes.object,
};

export default withRouter(WalletCreatingPage);
