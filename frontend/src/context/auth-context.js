import React from 'react';

const AuthContext = React.createContext({
    authToken: null,
    userData: null,
    loggedIn: false,
    login: () => {},
    logout: () => {},
    verifyToken: () => {},
    fetchUserData: () => {},

})

export default AuthContext;