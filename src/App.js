import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Login from "./components/Login";
import Games from "./components/Games";
import GameComponent from "./components/GameComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/gamespage" element={<Games />} exact />
          <Route path="/playgame" element={<GameComponent />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
