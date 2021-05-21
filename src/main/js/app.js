import {
    HashRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { adminRole } from './config';

import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage';
import WalletsPage from './pages/WalletsPage';

import useToken from './useToken';
import UserContext from './UserContext';
import WalletPage from './pages/WalletPage';
import WalletCreatingPage from './pages/WalletCreatingPage';
import EditWalletPage from './pages/EditWalletPage';
import TransactionPage from './pages/TransactionPage';

const React = require('react');
const ReactDOM = require('react-dom');

function App() {
    const {
        token, setToken, role, userId,
    } = useToken();
    const logout = () => {
        setToken({ token: null });
    };

    return (
        <UserContext.Provider value={{
            token, role, userId, logout,
        }}>
            <HashRouter>
                <Header text='Wallets'/>
                <Navbar/>
                <Switch>
                    <Route path='/login'>
                        <LoginPage setToken={setToken}/>
                    </Route>
                    <Route path="/sign-up" component={SignUpPage}/>

                    <PrivateRoute exact path='/' component={WalletsPage}/>
                    <PrivateRoute exact path='/wallet/create' component={WalletCreatingPage}/>
                    <PrivateRoute exact path='/wallet/:id' component={WalletPage}/>
                    <PrivateRoute exact path='/wallet/:id/edit' component={EditWalletPage}/>
                    <PrivateRoute exact path='/wallet/:id/send' component={TransactionPage}/>

                    <PrivateRoute roles={adminRole} exact path='/user/' component={UsersPage}/>

                    <PrivateRoute exact path='/user/:id' component={UserPage}/>
                    <PrivateRoute path='/user/:id/edit' component={EditUserPage}/>
                    <Redirect to='/'/>
                </Switch>

                <Footer lab='4' date='21.05.2021'/>
            </HashRouter>
        </UserContext.Provider>
    );
}

ReactDOM.render(
    (
        <App/>
    ),
    document.getElementById('react'),
);
