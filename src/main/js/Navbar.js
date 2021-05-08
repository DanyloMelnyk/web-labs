import {NavLink} from 'react-router-dom';

const React = require('react');

function Navbar({setToken}) { // FIXME
    const logout = (e) => {
        e.preventDefault();
        setToken({token: null});
    }

    return (
        <nav>
            <NavLink to='/user' activeClassName='active'>Users</NavLink>
            <NavLink to='/profile' activeClassName='active'>User page</NavLink>
            <NavLink exact to='/' activeClassName='active'>Wallets</NavLink>
            <NavLink onClick={logout} to='/logout' className='right'
                     activeClassName='active'>Logout</NavLink>
        </nav>
    );
}

export default Navbar;