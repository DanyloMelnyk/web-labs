import {useState} from "react";
import {withRouter} from "react-router";
import {postRequest} from "../common";
import {passMismatch, unknownError, userExists} from "../config";

const React = require('react');

function SignUpPage({history, location}) { // FIXME
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [role, setRole] = useState("user");

    const [error, setError] = useState();

    const handleSubmit = e => {
        e.preventDefault();

        if (passwordConfirm !== password) {
            setError(passMismatch);
        } else {
            setPasswordConfirm(e.target.value);
            setError(null);

            postRequest("public/user",
                () => {
                    const {from} = location.state || {from: {pathname: "/"}};
                    history.push(from);
                },
                error => {
                    if (error === 400) {
                        setError(userExists);
                    } else {
                        setError(unknownError);
                    }
                    console.log(error)
                },
                {
                    username,
                    email,
                    phone,
                    password,
                    passwordConfirm,
                    role
                }
            );
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
            <section className="card">
                <h2 className="centered">Sign up</h2>

                <form onSubmit={handleSubmit}>
                    {error &&
                    <div className="row error">
                        {error}
                    </div>
                    }

                    <div className="row">
                        <label htmlFor="username">Username: *</label>
                        <input onChange={e => setUsername(e.target.value)} autoComplete="username" id="username"
                               name="username" required type="text" className={error === userExists & "invalid"}/>
                    </div>

                    <div className="row">
                        <label htmlFor="email">Email: *</label>
                        <input onChange={e => setEmail(e.target.value)} autoComplete="email" id="email" name="email"
                               required type="email"/>
                    </div>

                    <div className="row">
                        <label htmlFor="phone">Phone:</label>
                        <input onChange={e => setPhone(e.target.value)} autoComplete="phone" id="phone" name="phone"
                               type="tel"/>
                    </div>

                    <div className="row">
                        <label htmlFor="password">Password: *</label>
                        <input onChange={e => setPassword(e.target.value)} autoComplete="new-password" id="password"
                               name="password" required type="password"/>
                    </div>

                    <div className="row">
                        <label htmlFor="password-confirm">Confirm password: *</label>
                        <input onChange={checkAndSetConfirmPass} autoComplete="new-password"
                               id="password-confirm" name="password" required
                               type="password" className={error === passMismatch ? "invalid" : ""}/>
                    </div>

                    <div className="row">
                        <label htmlFor="role">Role:</label>
                        <select onChange={e => setRole(e.target.value)} id="role" name="role">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="row">
                        <input id="signUp" type="submit" value="Sign Up"/>
                        <input type="reset" value="Cancel"/>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default withRouter(SignUpPage);