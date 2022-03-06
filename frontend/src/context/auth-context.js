import React from 'react';

const AuthContext = React.createContext({
    authToken: null,
    userData: null,
    loggedIn: false,
    login: (email, password) => {},
    logout: () => {},
    fetchUserData: () => {},
    verifyToken: () => {},
    uuid: null

})

export default AuthContext;