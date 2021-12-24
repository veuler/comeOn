import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./gamespage.css";
import { useNavigate } from "react-router";
import comeon from "./comeone.game-1.0.min.js"

function Games() {
  const allGames = [];
  const videoSlots = [];
  const slotMachines = [];

  const history = useNavigate();
  const [gameList, setGameList] = useState([]);
  const [chosenCategory, setchosenCategory] = useState(allGames);

  const { state } = useLocation();

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((result) => setGameList(result));
  }, []);

  gameList.map((game) => {
    if (game.categoryIds.includes(0)) {
      !allGames.includes(game) && allGames.push(game);
    }
    if (game.categoryIds.includes(1)) {
      !videoSlots.includes(game) && videoSlots.push(game);
    }
    if (game.categoryIds.includes(2)) {
      !slotMachines.includes(game) && slotMachines.push(game);
    }
  });

  useEffect(() => {
    setchosenCategory(allGames);
  }, [gameList]);

  function logoutHandler() {
    fetch("http://localhost:3001/logout", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: state.name,
      }),
    }).then((res) => history("/"));
  }

  console.log(state.results.name);
  return (
    <div className="gamesmainwrapper">
      <div className="mainwrapper">
        <img className="avatar" src={require("./" + state.results.avatar)} />
        <div className="playerinfo-desc">
          <div className="playername">{state.results.name}</div>
          <br />
          <div className="playerdesc">{state.results.event}</div>
          <input
            className="searchfield"
            type="text"
            placeholder="Search Game"
          />
          <i className="fa fa-search" />
        </div>
        <button className="logout-button" onClick={logoutHandler}>
          Log Out
        </button>

        <div className="gameslabel">Games</div>
        <div className="horizontalLineMain"></div>
      </div>

      <div className="gamespanel">
        <div className="categorieslabel">Categories</div>
        <div className="categoriespanel">
          <button
            className="categorybutton1"
            onClick={() => setchosenCategory(allGames)}
          >
            ALL
          </button>
          <button
            className="categorybutton2"
            onClick={() => setchosenCategory(videoSlots)}
          >
            VIDEO SLOTS
          </button>
          <button
            className="categorybutton3"
            onClick={() => setchosenCategory(slotMachines)}
          >
            SLOT MACHINES
          </button>
        </div>
        <div className="gamelistwrapper">,
        <div id="game-launch"></div>
          {chosenCategory.map((item) => {
            return (
              <>
                <div>
                  <img className="gameimage" src={require("./" + item.icon)} />
                  <label className="gamenamelabel">{item.name}</label>
                  <label className="gamedescriptionlabel">
                    {item.description}
                  </label>
                  <button 
                  className="playbutton"
                  onClick={() => console.log(comeon.game.launch('starburst'))}
                  >
                    Play</button>
                </div>
                <div className="horizontalLine"></div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Games;
