import { deleteRequest, getRequest } from '../common';
import User from '../components/User';
import UserContext from '../UserContext';
import PageWithSidebar from './PageWithSidebar';

const React = require('react');

export default class UsersPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
        };
    }

    componentDidMount() {
        const { token } = this.context;
        getRequest('user', (data) => {
            this.setState({
                isLoaded: true,
                users: data,
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error,
            });
        }, token);
    }

    render() {
        const deleteUser = (id) => {
            const currentUsers = this.state.users;

            this.setState({
                users: currentUsers.filter((user) => user.id !== id),
            });

            const { userId, logout, token } = this.context;

            deleteRequest(`user/${id}`, () => {
                if (id === userId) {
                    logout();
                }
            }, () => {
                this.setState({
                    users: currentUsers,
                });
            }, token);
        };

        const { error, isLoaded, users } = this.state;
        if (error) {
            return (
                <PageWithSidebar>
                    <div className='row error'>
                        {error}
                    </div>
                </PageWithSidebar>
            );
        }
        if (!isLoaded) {
            return (
                <PageWithSidebar>
                    <div className='row'>
                        Loading...
                    </div>
                </PageWithSidebar>
            );
        }
        return (
            <PageWithSidebar>
                {users.map((user) => (
                    <User key={user.id} deleteUser={deleteUser} user={user}/>
                ))}
            </PageWithSidebar>
        );
    }
}
