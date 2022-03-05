import React from 'react';

const AuthContext = React.createContext({
    authToken: null,
    userData: null,
    loggedIn: false,
    login: (email, password) => {},
    logout: () => {},
    verifyToken: () => {},
    fetchUserData: () => {},

})

export default AuthContext;