import logo from './logo.svg';
import GAuth from './components/GAuth';
import './index.css';
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-screen h-screen bg-white">
      <Navbar />
      <GAuth/>
    </div>
  );
}

export default App;
