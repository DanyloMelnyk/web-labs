import {useState} from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('user');
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    };

    const getUserRole = () => {
        const tokenString = localStorage.getItem('user');
        const userToken = JSON.parse(tokenString);
        return userToken?.role;
    };

    const getUserId = () => {
        const tokenString = localStorage.getItem('user');
        const userToken = JSON.parse(tokenString);
        return userToken?.id;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('user', JSON.stringify(userToken));
        setToken(userToken.token);
    };


    return {
        setToken: saveToken,
        token,
        role: getUserRole(),
        userId: getUserId()
    };
}