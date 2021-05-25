import { Link } from 'react-router-dom';
import { getRequest } from '../common';
import UserContext from '../UserContext';
import Row from '../components/Row';

const React = require('react');

export default class Profile extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            user: null,
        };
    }

    componentDidMount() {
        const { token, userId } = this.context;
        getRequest(`user/${userId}`, (data) => {
            this.setState({
                isLoaded: true,
                user: data,
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error: true,
            });
        }, token);
    }

    render() {
        const { error, isLoaded, user } = this.state;

        if (error) {
            return (
                <section className='card'>
                    <div className='row error'>
                        {error}
                    </div>
                </section>
            );
        }
        if (!isLoaded) {
            return (
                <section className='card'>
                    <div className='row'>
                        Loading...
                    </div>
                </section>
            );
        }
        return (
            <section className='card'>
                <div className='head'>
                    <h2>
                        <Link className='link' to={`/user/${user.id}`}>
                                My profile
                        </Link>
                    </h2>
                </div>

                <Row label='First name:' value={user.firstName}/>
                <Row label='Last name:' value={user.lastName}/>
                <Row label='Email:' value={user.email}/>
                <Row label='Phone:' value={user.phone}/>
                <Row label='Role:' value={user.role}/>
            </section>
        );
    }
}
