import PropTypes from 'prop-types';
import { deleteRequest, getRequest } from '../common';
import UserContext from '../UserContext';
import PageWithSidebar from './PageWithSidebar';
import Wallet from '../components/Wallet';

const React = require('react');

export default class WalletPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            wallet: null,
        };
    }

    componentDidMount() {
        const { token } = this.context;
        getRequest(`wallet/${this.props.match.params.id}`, (data) => {
            this.setState({
                isLoaded: true,
                wallet: data,
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error,
            });
        }, token);
    }

    render() {
        const deleteWallet = (id) => {
            const { token } = this.context;

            deleteRequest(`wallet/${id}`, () => {
                this.props.history.push('/');
            }, () => null, token);
        };

        const {
            error,
            isLoaded,
            wallet,
        } = this.state;

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
                    <div className="row error">
                        Loading...
                    </div>
                </PageWithSidebar>
            );
        }
        return (
            <PageWithSidebar>
                <Wallet wallet={wallet} deleteWallet={deleteWallet}/>
            </PageWithSidebar>
        );
    }
}

WalletPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};
