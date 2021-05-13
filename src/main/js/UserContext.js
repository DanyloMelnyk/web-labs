const React = require('react');

const UserContext = React.createContext({
    token: null, role: null, userId: null, logout: () => null,
});

export default UserContext;
