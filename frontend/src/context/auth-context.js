import React from 'react';

const AuthContext = React.createContext({
    authToken: null,
    userData: null,
    loggedIn: false,
    login: (email, password) => {},
    logout: () => {},
    fetchUserData: () => {},
    uuid: null

})

export default AuthContext;