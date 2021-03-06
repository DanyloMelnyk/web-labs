import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Row from './Row';
import Card from './Card';

const React = require('react');

export default function User({
    user,
    deleteUser,
}) {
    return (
        <Card
            title={
                <Link to={`/user/${user.id}`} className="link">{user.username}</Link>
            }
            actions={
                <div className="actions">
                    <Link to={`/user/${user.id}/edit`} className="edit">
                        <i className="fas fa-edit"/>
                    </Link>
                    <a onClick={() => deleteUser(user.id)} className="delete">
                        <i className="fas fa-trash"/>
                    </a>
                </div>
            }>

            <Row label="First name:" value={user.firstName}/>
            <Row label="Last name:" value={user.lastName}/>
            <Row label="Email:" value={user.email}/>
            <Row label="Phone:" value={user.phone}/>
            <Row label="Role:" value={user.role}/>
        </Card>
    );
}

User.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        role: PropTypes.string,
    }),
    deleteUser: PropTypes.func,
};
