const React = require('react');

export const UserContext = React.createContext({
    token: null, role: null, userId: null, logout: () => {
    }
});
