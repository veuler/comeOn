// import './App.css';
import { Routes,Route, BrowserRouter as Router, Link } from "react-router-dom";
import PlayGame from "./components/PlayGame";
import Login from "./components/Login";
import Games from "./components/Games"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login/>} exact />
        <Route path="/gamespage" element={<Games/>} exact />
        <Route path="/playgame" element={<PlayGame/>} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
