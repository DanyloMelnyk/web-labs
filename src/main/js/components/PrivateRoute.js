import {UserContext} from "../UserContext";
import {Redirect, Route} from 'react-router-dom';
import {useContext} from "react";

const React = require('react');

export default function PrivateRoute({component: Component, roles, ...rest}) {
    const {role} = useContext(UserContext);

    console.log("role", role);

    return (
        <Route {...rest} render={props => {
            if (!role) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }

            // check if route is restricted by role
            if (roles && roles.indexOf(role) === -1) {
                return <Redirect to={{pathname: '/'}}/>
            }

            return <Component {...props} />
        }}/>
    )
};