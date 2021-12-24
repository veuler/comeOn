import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./gamespage.css";
function Games() {
  const [gameList, setGameList] = useState([]);
  const { state } = useLocation();
  console.log("geçti", state);
  useEffect(() => {
    const gameListreq = fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((result) => setGameList(result));
  }, []);

  console.log(gameList);
  return (
    <div className="gamesmainwrapper">
        <img
        className="avatar"
        src={require("./" + state.avatar)} />
        <div
        className="playerinfo-desc">
          <div
          className="playername">{state.name}</div>
          <br />
          <div
          className="playerdesc">{state.event}</div>
          
        </div>
      
    </div>
  );
}

export default Games;
