import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import { getRequest } from '../common';
import Card from '../components/Card';

const React = require('react');

export default class UserWallets extends React.Component {
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
        const {
            error,
            isLoaded,
            wallets,
        } = this.state;

        if (error) {
            return (
                <Card title={<Link className="link" to="/">My wallets</Link>}>
                    <div className="row error">
                        {error}
                    </div>
                </Card>
            );
        }
        if (!isLoaded) {
            return (
                <Card title={<Link className="link" to="/">My wallets</Link>}>
                    <div className="row">
                        Loading...
                    </div>
                </Card>
            );
        }
        return (
            <Card title={<Link className="link" to="/">My wallets</Link>}>
                <ul>
                    {
                        wallets.map((wallet) => (
                            <li key={wallet.id}>
                                <Link className="link" to={`/wallet/${wallet.id}`}>
                                    <div className="row">
                                        <p className="field-label">{wallet.name}</p>
                                        <p className="field">{wallet.balance} {wallet.currency}</p>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </Card>
        );
    }
}
