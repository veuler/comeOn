import comeon from "../mock/comeone.game-1.0.min.js";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./styles/gamecomponent.css";

const GameComponent = () => {
  const location = useLocation();
  const state = location.state;

  // Wait for page to render
  // because API needs a div with id="game-launch"
  useEffect(() => {
    comeon.game.launch(state.gameName);
  }, []);

  return (
    <>
      <div className="game-launch" id="game-launch"></div>

      {/* Pass state.results and state.name to /gamespage again
      otherwise /gamespage will lose the player data
      and won't be able to render again*/}
      <Link
        className="gobackbutton"
        to="/gamespage"
        state={{ results: state.results, name: state.name }}
      >
        {" < Back to Games"}
      </Link>
    </>
  );
};

export default GameComponent;
