import { useState } from 'react';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';
import { postRequest } from '../common';
import FormRow from '../components/FormRow';
import Card from '../components/Card';

const React = require('react');

function LoginPage({
    setToken,
    history,
    location,
}) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [hasError, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        postRequest('public/login',
            (token) => {
                setToken(token);
                const { from } = location.state || { from: { pathname: '/' } };
                history.push(from);
            },
            () => {
                setError(true);
            },
            {
                username,
                password,
            });
    };

    return (
        <main>
            <Card title="Sign in">
                <form onSubmit={handleSubmit}>
                    {hasError
                    && <div className="row error">
                        Incorrect login credo
                    </div>
                    }

                    <FormRow label="Username: *" inputId={username} required autoComplete="username"
                        name="username"
                        type="text" onChange={(e) => setUsername(e.target.value)}/>

                    <FormRow label="Password: *" inputId="password" required
                        autoComplete="current-password"
                        name="password" type="password"
                        onChange={(e) => setPassword(e.target.value)}/>

                    <div className="row">
                        <input type="submit" value="Sign In"/>
                    </div>
                </form>
            </Card>
        </main>
    );
}

LoginPage.propTypes = {
    setToken: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.shape({
        state: PropTypes.object,
    }),
};

export default withRouter(LoginPage);
