import { useState } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { postRequest } from '../common';
import { passMismatch, unknownError, userExists } from '../config';
import FormRow from '../components/FormRow';
import Card from '../components/Card';

const React = require('react');

function SignUpPage({
    history,
    location,
}) {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [role, setRole] = useState('user');

    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordConfirm !== password) {
            setError(passMismatch);
        } else {
            setPasswordConfirm(e.target.value);
            setError(null);

            postRequest('public/user',
                () => {
                    const { from } = location.state || { from: { pathname: '/' } };
                    history.push(from);
                },
                (errorCode) => {
                    if (errorCode === 400) {
                        setError(userExists);
                    } else {
                        setError(unknownError);
                    }
                },
                {
                    username,
                    email,
                    phone,
                    password,
                    passwordConfirm,
                    role,
                });
        }
    };

    const checkAndSetConfirmPass = (e) => {
        if (e.target.value !== password) {
            setError(passMismatch);
        } else {
            setPasswordConfirm(e.target.value);
            setError(null);
        }
    };

    return (
        <main>
            <Card title="Sign up">
                <form onSubmit={handleSubmit}>
                    {error
                    && <div className="row error">
                        {error}
                    </div>
                    }

                    <FormRow label="Username: *" inputId="username"
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username" name="username" required type="text"
                        className={error === userExists ? 'invalid' : undefined}/>

                    <FormRow label="Email: *" inputId="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email" name="email" required type="email"/>

                    <FormRow label="Phone:" inputId="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="phone" name="phone" type="tel"/>

                    <FormRow label="Password: *" inputId="password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password" name="password" required type="password"/>

                    <FormRow label="Confirm password: *" inputId="password-confirm"
                        onChange={checkAndSetConfirmPass}
                        autoComplete="new-password" name="password" required
                        type="password"
                        className={error === passMismatch ? 'invalid' : ''}/>

                    <FormRow label="Role:" inputId="role" rest={null}>
                        <select onChange={(e) => setRole(e.target.value)} id="role" name="role">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </FormRow>

                    <div className="row">
                        <input id="signUp" type="submit" value="Sign Up"/>
                        <input type="reset" value="Cancel"/>
                    </div>
                </form>
            </Card>
        </main>
    );
}

SignUpPage.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.object,
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(SignUpPage);
