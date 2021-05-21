import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import UserContext from '../UserContext';
import { getRequest, putRequest } from '../common';

import { adminRole } from '../config';
import Card from '../components/Card';
import FormRow from '../components/FormRow';
import PageWithSidebar from './PageWithSidebar';

const React = require('react');

class EditWalletPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            wallet: null,
            formError: null,
        };
    }

    componentDidMount() {
        const { token } = this.context;
        getRequest(`wallet/${this.props.match.params.id}`, (wallet) => {
            this.setState({
                isLoaded: true,
                wallet,
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error,
            });
        }, token);
    }

    render() {
        const {
            error,
            formError,
            isLoaded,
            wallet,
        } = this.state;

        const {
            token,
            role,
        } = this.context;

        const handleSubmit = (e) => {
            e.preventDefault();

            putRequest(`wallet/${wallet.id}`,
                () => this.props.history.push(`/wallet/${wallet.id}`),
                () => null, wallet, token);
        };

        const setWallet = (newWallet) => {
            this.setState({ wallet: newWallet });
        };

        if (error) {
            return (
                <PageWithSidebar>
                    <div className="row error">
                        {error}
                    </div>
                </PageWithSidebar>
            );
        }
        if (!isLoaded) {
            return (
                <PageWithSidebar>
                    <div className="row">
                        Loading...
                    </div>
                </PageWithSidebar>
            );
        }
        return (
            <PageWithSidebar>
                <Card>
                    <form onSubmit={handleSubmit}>
                        {formError
                        && <div className="row error">
                            {formError}
                        </div>
                        }

                        <FormRow label="Wallet name: *" inputId="wallet-name"
                            value={wallet.name}
                            onChange={(e) => {
                                wallet.name = e.target.value;
                                setWallet(wallet);
                            }}
                            name="wallet-name" required type="text"/>

                        {role === adminRole
                        && <div>
                            <FormRow label="Currency:" inputId="currency" rest={null}>
                                <select value={wallet.currency} onChange={(e) => {
                                    wallet.currency = e.target.value;
                                    setWallet(wallet);
                                }} id="currency" name="currency">
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="UAH">UAH</option>
                                </select>
                            </FormRow>
                            <FormRow label="Balance:" inputId="balance" min="0" name="balance" step="0.01"
                                type="number" value={wallet.balance} onChange={(e) => {
                                    wallet.balance = e.target.value;
                                    setWallet(wallet);
                                }}/>
                        </div>
                        }

                        <div className="row">
                            <input type="submit" value="Save"/>
                        </div>
                    </form>
                </Card>
            </PageWithSidebar>
        );
    }
}

EditWalletPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(EditWalletPage);
