import {useState} from "react";
import {withRouter} from "react-router";

import {postRequest} from "../common";

const React = require('react');


function LoginPage({setToken, history, location}) { // FIXME
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [hasError, setError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        postRequest("public/login",
            token => {
                setToken(token);
                const {from} = location.state || {from: {pathname: "/"}};
                history.push(from);
            },
            msg => {
                setError(true);
                console.log(msg)
            },
            {
                username,
                password
            }
        );
    };

    return (
        <main>
            <section className="card">
                <h2 className="centered">Sign in</h2>

                <form onSubmit={handleSubmit}>
                    {hasError &&
                    <div className="row error">
                        Incorrect login credo
                    </div>
                    }

                    <div className="row">
                        <label htmlFor="username">Username: *</label>
                        <input required autoComplete="username" id="username" name="username" type="text"
                               onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className="row">
                        <label htmlFor="password">Password: *</label>
                        <input required autoComplete="current-password" id="password" name="password" type="password"
                               onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className="row">
                        <input type="submit" value="Sign In"/>
                    </div>
                </form>

            </section>
        </main>
    );
}

export default withRouter(LoginPage);