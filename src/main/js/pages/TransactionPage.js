import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { useContext, useState } from 'react';
import UserContext from '../UserContext';
import { transaction } from '../common';
import Card from '../components/Card';
import FormRow from '../components/FormRow';

const React = require('react');

function TransactionPage({
    history,
    match,
}) {
    const [username, setUsername] = useState();
    const [recipientWalletId, setWalletId] = useState();
    const [sum, setSum] = useState();
    const [error, setError] = useState();

    const { token } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        transaction(`wallet/${match.params.id}/send`,
            () => {
                history.push(`wallet/${match.params.id}`);
            },
            (errorCode) => {
                errorCode.then((msg) => setError(msg));
            },
            {
                username,
                recipientWalletId,
                sum,
            }, token);
    };

    return (
        <main>
            <Card>
                <form onSubmit={handleSubmit}>
                    {error
                    && <div className="row error">
                        {error}
                    </div>
                    }

                    <FormRow label="Recipient username: *" inputId="username" type="text"
                        onChange={(e) => setUsername(e.target.value)} required/>

                    <FormRow label="Recipient wallet id: *" inputId="wallet-id" name="wallet-id"
                        required type="number" onChange={(e) => setWalletId(e.target.value)}/>

                    <FormRow label="Sum: *" inputId="sum" min="0" name="sum" required
                        step="0.01" type="number" onChange={(e) => setSum(e.target.value)}/>

                    <div className="row">
                        <input type="submit" value="Create"/>
                        <input type="reset" value="Cancel"/>
                    </div>
                </form>
            </Card>
        </main>
    );
}

TransactionPage.propTypes = {
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }),
};

export default withRouter(TransactionPage);
