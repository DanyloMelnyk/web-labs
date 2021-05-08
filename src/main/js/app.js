import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';


import Footer from "./Footer";
import Header from "./Header";
import WalletsPage from "./pages/WalletsPage";
import UserPage from "./pages/UserPage";
import Navbar from "./Navbar";
import LoginPage from "./pages/LoginPage";
import useToken from "./useToken";

const React = require('react');
const ReactDOM = require('react-dom');

function App() {
    const {token, setToken} = useToken();

    console.log("Token", token);
    return (
        <div>
            <Header text='Wallets'/>
            <Navbar setToken={setToken}/>
            {token ?
                <Switch>
                    <Route path='/login'>
                        <LoginPage setToken={setToken}/>
                    </Route>
                    <Route token={token} exact path='/' component={WalletsPage}/>
                    <Route token={token} path='/user/:id' component={UserPage}/>
                    <Redirect to='/'/>
                </Switch>
                : <LoginPage setToken={setToken}/>
            }

            <Footer lab='3' date='08.05.2021'/>
        </div>
    );
}

ReactDOM.render(
    (
        <HashRouter>
            <App/>
        </HashRouter>
    ),
    document.getElementById('react')
);