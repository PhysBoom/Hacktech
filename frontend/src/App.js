import logo from './logo.svg';
import './index.css';
import Navbar from "./components/Navbar";
import {Register} from './pages'
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
      </Switch>
    </div>
  );
}

export default App;
