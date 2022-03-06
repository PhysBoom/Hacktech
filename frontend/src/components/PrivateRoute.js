import React, {useContext, useEffect, useCallback, useState} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import {FullScreenLoader} from './Loaders';
/*
A private route depending on the auth-context context
*/

function PrivateRoute(props) {
    
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const checkLoginBeforeRender = useCallback(async () => {
        const authResp = await auth.verifyToken();
        if (authResp.data.success) {
            setIsAuthenticating(false);
        } 
    }, []);

    useEffect(() => {
        checkLoginBeforeRender();
    }, [checkLoginBeforeRender]);

    if (isAuthenticating) {
        return <FullScreenLoader />
    } 
    return props.children;


    
}

export default PrivateRoute;