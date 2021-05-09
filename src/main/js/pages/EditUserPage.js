import {UserContext} from "../UserContext";
import {getRequest, putRequest} from "../common";

import {passMismatch} from "../config";
import {withRouter} from "react-router";

const React = require('react');

class EditUserPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            user: null,
            formError: null
        };
    }

    componentDidMount() {
        const {token} = this.context;
        getRequest(`user/${this.props.match.params.id}`, (data) => {
            data.password = "";
            data.passwordConfirm = "";

            this.setState({
                isLoaded: true,
                user: data
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }, token);
    }

    render() {
        const {error, formError, isLoaded, user} = this.state;
        const {token} = this.context;

        const handleSubmit = e => {
            e.preventDefault();

            if (user.passwordConfirm !== user.password) {
                this.setState({formError: passMismatch});
            } else {
                this.setState({formError: null});

                putRequest(`user/${user.id}`, () => this.props.history.push(`/user/${user.id}`), () => null, user, token);
            }
        }

        const setUser = (user) => {
            this.setState({user});
        }

        const checkAndSetConfirmPass = (e) => {
            user.passwordConfirm = e.target.value;

            if (e.target.value !== user.password) {
                this.setState({formError: passMismatch});
            } else {
                this.setState({formError: null});
            }
        };

        if (error) {
            return (
                <main>
                    <div className="row error">
                        {error}
                    </div>
                </main>
            )
        } else if (!isLoaded) {
            return (
                <main>
                    <div className="row">
                        Loading...
                    </div>
                </main>
            )
        } else {
            return (
                <main>
                    <section className="card">
                        <form onSubmit={handleSubmit}>
                            {formError &&
                            <div className="row error">
                                {formError}
                            </div>
                            }
                            <div className="row">
                                <label htmlFor="first-name">First name:</label>
                                <input value={user.firstName} onChange={e => {
                                    user.firstName = e.target.value;
                                    setUser(user);
                                }} id="first-name" name="first-name" type="text"/>
                            </div>
                            <div className="row">
                                <label htmlFor="last-name">Last name:</label>
                                <input value={user.lastName} onChange={e => {
                                    user.lastName = e.target.value;
                                    setUser(user);
                                }} id="last-name" name="last-name" type="text"/>
                            </div>
                            <div className="row">
                                <label htmlFor="email">Email:</label>
                                <input value={user.email} onChange={e => {
                                    user.email = e.target.value;
                                    setUser(user);
                                }} autoComplete="email" id="email" name="email" type="email"/>
                            </div>
                            <div className="row">
                                <label htmlFor="phone">Phone:</label>
                                <input value={user.phone} onChange={e => {
                                    user.phone = e.target.value;
                                    setUser(user);
                                }} id="phone" name="phone" type="tel"/>
                            </div>

                            <div className="row">
                                <label htmlFor="password">Password: *</label>
                                <input value={user.password} onChange={e => {
                                    user.password = e.target.value;
                                    setUser(user);
                                }} autoComplete="new-password" id="password" name="password" required type="password"/>
                            </div>
                            <div className="row">
                                <label htmlFor="password-confirm">Confirm password: *</label>
                                <input value={user.passwordConfirm} onChange={checkAndSetConfirmPass}
                                       autoComplete="new-password" id="password-confirm" name="password" required
                                       type="password" className={error === passMismatch ? "invalid" : ""}/>
                            </div>

                            <div className="row">
                                <label htmlFor="role">Role:</label>
                                <select value={user.role} onChange={e => {
                                    user.role = e.target.value;
                                    setUser(user);
                                }} id="role" name="role">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="row">
                                <input type="submit" value="Save"/>
                            </div>
                        </form>
                    </section>
                </main>
            );
        }
    }
}

export default withRouter(EditUserPage);