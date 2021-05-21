import { Link } from 'react-router-dom';
import { deleteRequest, getRequest } from '../common';
import UserContext from '../UserContext';
import PageWithSidebar from './PageWithSidebar';
import Wallet from '../components/Wallet';
import Card from '../components/Card';

const React = require('react');

export default class WalletsPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            wallets: [],
        };
    }

    componentDidMount() {
        const { token } = this.context;
        getRequest('wallet', (data) => {
            this.setState({
                isLoaded: true,
                wallets: data,
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
            const currentWallets = this.state.wallets;

            this.setState({
                wallets: currentWallets.filter((wallet) => wallet.id !== id),
            });

            const { token } = this.context;

            deleteRequest(`wallet/${id}`, () => null, () => {
                this.setState({
                    wallets: currentWallets,
                });
            }, token);
        };

        const {
            error,
            isLoaded,
            wallets,
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
                    <div className="row">
                        Loading...
                    </div>
                </PageWithSidebar>
            );
        }
        return (
            <PageWithSidebar>
                <Card
                    title="My wallets"
                    actions={
                        <div className="right actions">
                            <Link className="create" to="/wallet/create">
                                <i className="fas fa-plus-square"/>
                            </Link>
                        </div>
                    }/>

                {wallets.map((wallet) => (
                    <Wallet key={wallet.id} deleteWallet={deleteWallet} wallet={wallet}/>
                ))}
            </PageWithSidebar>
        );
    }
}
