import {NavLink} from 'react-router-dom';
import {admin_role} from "../common";
import {useContext} from "react";
import {UserContext} from "../UserContext";

const React = require('react');

function Navbar() {
    const {role, userId, logout} = useContext(UserContext);

    if (role) {
        return (
            <nav>
                {role === admin_role && <NavLink to='/user' activeClassName='active'>Users</NavLink>}
                <NavLink to={'/user/' + userId}>User page</NavLink>
                <NavLink exact to='/' activeClassName='active'>Wallets</NavLink>
                <NavLink onClick={
                    (e) => {
                        e.preventDefault();
                        logout();
                    }
                } to='/logout' className='right' activeClassName='active'>Logout</NavLink>
            </nav>
        );
    }

    return (
        <nav>
            <NavLink to='/login' className='right' activeClassName='active'>Login</NavLink>
            <NavLink to='/sign-up' className='right' activeClassName='active'>Sign Up</NavLink>
        </nav>
    )
}

export default Navbar;