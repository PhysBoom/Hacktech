import logo from './logo.svg';
import './index.css';
import Navbar from "./components/Navbar";
import {Register, GameModes, SentenceGen} from './pages'
import {
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="w-screen h-screen bg-white">
      <Navbar />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/gamemodes">
          <GameModes />
        </Route>
        <Route path="/sentencegen">
          <SentenceGen />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

