import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from './Card';
import Row from './Row';

const React = require('react');

export default function Wallet({
    wallet,
    deleteWallet,
}) {
    return (
        <Card
            title={
                <Link to={`/wallet/${wallet.id}`} className="link">{wallet.name}</Link>
            }
            actions={
                <div className="actions">
                    <Link to={`/wallet/${wallet.id}/edit`} className="edit">
                        <i className="fas fa-edit"/>
                    </Link>
                    <Link to="/" onClick={() => deleteWallet(wallet.id)} className="delete">
                        <i className="fas fa-trash"/>
                    </Link>
                    <Link to={`/wallet/${wallet.id}/send`} className="send">
                        <i className="fas fa-share"/>
                    </Link>
                </div>
            }>

            <Row label="Id:" value={wallet.id}/>
            <Row label="Balance:" value={wallet.balance}/>
            <Row label="Currency:" value={wallet.currency}/>
        </Card>
    );
}

Wallet.propTypes = {
    wallet: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        balance: PropTypes.number,
        currency: PropTypes.string,
    }),
    deleteWallet: PropTypes.func.isRequired,
};
