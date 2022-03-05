import React, {useState} from "react";
import './index.css';
import Navbar from "./components/Navbar";
import {Register} from './pages'
import {
  Switch,
  Route,
} from 'react-router-dom';
import AuthContext from './context/auth-context';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const [authToken, setAuthToken] = useState(cookies.get('authToken'));
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  async function login(){

  }

  function logout(){

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
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
