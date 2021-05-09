const React = require('react');
const ReactDOM = require('react-dom');
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UsersPage from './pages/UsersPage';
import UserPage from "./pages/UserPage";
import EditUserPage from "./pages/EditUserPage";
import WalletsPage from './pages/WalletsPage';

import useToken from './useToken';
import {admin_role} from './common';
import {UserContext} from "./UserContext";

function App() {
    const {token, setToken, role, userId} = useToken();
    const logout = () => {
        setToken({token: null});
    }

    return (
        <UserContext.Provider value={{token, role, userId, logout}}>
            <HashRouter>
                <Header text='Wallets'/>
                <Navbar/>
                <Switch>
                    <Route path='/login'>
                        <LoginPage setToken={setToken} history={history}/>
                    </Route>
                    <Route path='/sign-up'>
                        <SignUpPage history={history}/>
                    </Route>
                    <PrivateRoute exact path='/' component={WalletsPage}/>
                    <PrivateRoute roles={admin_role} exact path='/user/' component={UsersPage}/>

                    <PrivateRoute exact path='/user/:id' component={UserPage}/>
                    <PrivateRoute path='/user/:id/edit' component={EditUserPage}/>
                    <Redirect to='/'/>
                </Switch>

                <Footer lab='3' date='08.05.2021'/>
            </HashRouter>
        </UserContext.Provider>
    );
}

ReactDOM.render(
    (
        <App/>
    ),
    document.getElementById('react')
);