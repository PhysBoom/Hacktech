import React, {useState, useEffect} from "react";
import './index.css';
import Navbar from "./components/Navbar";
import {Register, Login} from './pages'
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import AuthContext from './context/auth-context';
import Cookies from 'universal-cookie';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const cookies = new Cookies();
  const history = useHistory();
  const [authToken, setAuthToken] = useState(cookies.get('authToken'));
  const [uuid, setUuid] = useState(cookies.get('uuid'))
  const [refreshToken, setRefreshToken] = useState(cookies.get('refreshToken'));
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [lastAuthRefresh, setLastAuthRefresh] = useState(Date.now());

  // Verify token on startup
  useEffect(() => {
    if (authToken) {
      verifyToken();
    }
  }, [authToken, verifyToken]);

  async function login(email, password){
    const resp = await axios({
        method: "POST",
        url: "/auth/login",
        data: {
            email: email,
            password: password
        }
    })
    if (resp.data.success){
      cookies.set('authToken', resp.data.id_token, {path: '/'});
      cookies.set('uuid', resp.data.uuid, {path: '/'});
      cookies.set('refreshToken', resp.data.refresh_token, {path: '/'});
      setUuid(resp.data.uuid);
      setAuthToken(resp.data.id_token);
      setRefreshToken(resp.data.refresh_token);
      fetchUserData(resp.data.uuid);
      setLoggedIn(true);
    }
    return resp;
  }

  function logout(){
    setAuthToken(null);
    setLoggedIn(false);
    cookies.remove('authToken');
    history.push("/");
  }

  async function fetchUserData(uuid_to_fetch=uuid){
    const resp = await axios({
        method: "GET",
        url: `/user/${uuid_to_fetch}`,
        headers: {
            "Authorization": authToken
        }
    })
    if (resp.data.success){
      setUserData(resp.data.user);
    }
    return resp;

  }

  async function verifyToken(){
    const resp = await axios({
        method: "POST",
        url: "/auth/verify",
        data: {
            token: authToken
        }
    })
    if (resp.data.success){
      setLoggedIn(true);
    } else {
      history.push("/login");
    }
    return resp;
  }

  async function refreshAuthToken(){
    console.log("Refreshing")
    const resp = await axios({
        method: "POST",
        url: `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        data: {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }
    })
    if (resp.data.success){
      cookies.set('authToken', resp.data.id_token, {path: '/'});
      setAuthToken(resp.data.id_token);
      setLastAuthRefresh(Date.now());
    }
  }

  // Call refreshAuthToken every 30 minutes using setInterval
  setInterval(() => {
    if (Date.now() - lastAuthRefresh > 25 * 60 * 1000 && authToken && loggedIn) {
      refreshAuthToken();
    }
  }, 30 * 60 * 1000);

  return (
    <AuthContext.Provider value={{
      authToken: authToken,
      login: login,
      logout: logout,
      userData: userData,
      loggedIn: loggedIn,
      fetchUserData: fetchUserData,
      uuid: uuid,
      verifyToken: verifyToken
    }}>
      <div className="w-screen h-screen bg-white">
        <Navbar />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
