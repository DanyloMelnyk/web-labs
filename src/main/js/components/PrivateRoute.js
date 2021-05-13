import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../UserContext';

const React = require('react');

export default function PrivateRoute({
    component: Component, roles, location, ...rest
}) {
    const { role } = useContext(UserContext);

    return (
        <Route {...rest} render={(props) => {
            if (!role) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: location } }}/>;
            }

            // check if route is restricted by role
            if (roles && roles.indexOf(role) === -1) {
                return <Redirect to={{ pathname: '/' }}/>;
            }

            return <Component {...props} />;
        }}/>
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    roles: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
    location: PropTypes.object,
};
