import React, {useState} from "react";
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

function App() {
  const cookies = new Cookies();
  const history = useHistory();
  const [authToken, setAuthToken] = useState(cookies.get('authToken'));
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

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
      cookies.set('authToken', resp.data.authToken, {path: '/'});
      setAuthToken(resp.data.authToken);
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

  async function verifyToken(){

  }

  async function fetchUserData(){

  }

  return (
    <AuthContext.Provider value={{
      authToken: authToken,
      login: login,
      logout: logout,
      verifyToken: verifyToken,
      userData: userData,
      loggedIn: loggedIn,
      fetchUserData: fetchUserData,
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
