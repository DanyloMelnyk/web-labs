import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import UserContext from '../UserContext';
import { getRequest, putRequest } from '../common';

import { passMismatch } from '../config';
import Card from '../components/Card';
import FormRow from '../components/FormRow';
import PageWithSidebar from './PageWithSidebar';

const React = require('react');

class EditUserPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            user: null,
            formError: null,
        };
    }

    componentDidMount() {
        const { token } = this.context;
        getRequest(`user/${this.props.match.params.id}`, (data) => {
            data.password = '';
            data.passwordConfirm = '';
            data.firstName = data.firstName ? data.firstName : '';
            data.lastName = data.lastName ? data.lastName : '';
            this.setState({
                isLoaded: true,
                user: data,
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
            user,
        } = this.state;
        const { token } = this.context;

        const handleSubmit = (e) => {
            e.preventDefault();

            if (user.passwordConfirm !== user.password) {
                this.setState({ formError: passMismatch });
            } else {
                this.setState({ formError: null });

                putRequest(`user/${user.id}`, () => this.props.history.push(`/user/${user.id}`), () => null, user, token);
            }
        };

        const setUser = (newUser) => {
            this.setState({ user: newUser });
        };

        const checkAndSetConfirmPass = (e) => {
            user.passwordConfirm = e.target.value;

            if (e.target.value !== user.password) {
                this.setState({ formError: passMismatch });
            } else {
                this.setState({ formError: null });
            }
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

                        <FormRow label="First name:" inputId="first-name" value={user.firstName}
                            onChange={(e) => {
                                user.firstName = e.target.value;
                                setUser(user);
                            }} name="first-name" type="text"/>

                        <FormRow label="Last name:" inputId="last-name" value={user.lastName}
                            onChange={(e) => {
                                user.lastName = e.target.value;
                                setUser(user);
                            }} id="last-name" name="last-name" type="text"/>

                        <FormRow label="Email:" inputId="email" value={user.email}
                            onChange={(e) => {
                                user.email = e.target.value;
                                setUser(user);
                            }} autoComplete="email" name="email" type="email"/>

                        <FormRow label="Phone:" inputId="phone" value={user.phone}
                            onChange={(e) => {
                                user.phone = e.target.value;
                                setUser(user);
                            }} name="phone" type="tel"/>

                        <FormRow label="Password: *" inputId="password" value={user.password}
                            onChange={(e) => {
                                user.password = e.target.value;
                                setUser(user);
                            }} autoComplete="new-password" name="password" required
                            type="password"/>

                        <FormRow label="Confirm password: *" inputId="password-confirm"
                            value={user.passwordConfirm}
                            onChange={checkAndSetConfirmPass} autoComplete="new-password"
                            name="password"
                            required type="password"
                            className={error === passMismatch ? 'invalid' : ''}/>

                        <FormRow label="Role:" inputId="role" rest={null}>
                            <select value={user.role} onChange={(e) => {
                                user.role = e.target.value;
                                setUser(user);
                            }} id="role" name="role">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </FormRow>

                        <div className="row">
                            <input type="submit" value="Save"/>
                        </div>
                    </form>
                </Card>
            </PageWithSidebar>
        );
    }
}

EditUserPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(EditUserPage);
