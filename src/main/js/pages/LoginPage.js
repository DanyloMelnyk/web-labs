import {useState} from "react";

const React = require('react');

const checkStatus = (response) => {
    if (response.ok) {
        return response;
    }
    return Promise.reject(response.status);
};

const postRequest = (url, action, onError, body) => {

    console.log(JSON.stringify(body));
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
    })
        .then(checkStatus)
        .then((response) => response.json())
        .then((data) => {
            action(data);
        })
        .catch((msg) => {
            onError(msg);
            // `Error ${msg} when send POST to ${url}!`
        });
};

function LoginPage({setToken}) { // FIXME
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [hasError, setError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        postRequest("/api/v1/public/login",
            token => {
                setToken(token);
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
                        <label htmlFor="username">Username:</label>
                        <input autoComplete="username" id="username" name="username" type="text"
                               onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className="row">
                        <label htmlFor="password">Password:</label>
                        <input autoComplete="current-password" id="password" name="password" type="password"
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

export default LoginPage;