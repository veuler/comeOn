import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./styles/gamespage.css";
import { useNavigate } from "react-router";
import comeon from "../mock/comeone.game-1.0.min.js";
import logo from "./images/logo.svg";

function Games() {
  // Store the categories
  const allGames = [];
  const videoSlots = [];
  const slotMachines = [];

  const history = useNavigate();

  // Store the gamelist first when the page has rendered
  const [gameList, setGameList] = useState([]);

  // Store the chosen category
  // Default is allgames, so that we can list allgames when the page has rendered
  const [chosenCategory, setchosenCategory] = useState(allGames);

  // Store the search input
  const [searchFilter, setSearchFilter] = useState("");

  // Get params from Login screen
  const { state } = useLocation();

  // When the page has rendered, get the game list
  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((result) => setGameList(result));
  }, []);

  // Categorize the games by their category id
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

  // Since fetch is async and setGameList(result)
  // sets an empty array when the page has rendered at the beginning
  // We check if gamelist has been changed
  // When fetch has been finished, gamelist will be changed
  // then we set allgames
  useEffect(() => {
    setchosenCategory(allGames);
  }, [gameList]);

  // If player name matches with database
  // logout and redirect to login page
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

  // Game list panel
  // Store it as a function so we can render
  // whenever we want with 1-block of code
  function renderModal(item) {
    return (
      <>
        <div>
          <img className="gameimage" src={require("./" + item.icon)} />
          <label className="gamenamelabel">{item.name}</label>
          <label className="gamedescriptionlabel">{item.description}</label>
          <Link
            className="playbutton"
            to="/playgame"
            state={{
              gameName: item.code,
              results: state.results,
              name: state.name,
            }}
          >
            {"Play >"}
          </Link>
        </div>
        <div className="horizontalLine"></div>
      </>
    );
  }

  return (
    <div className="rootdiv">
      <img className="logo" src={logo} />
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
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <i className="fa fa-search" />
          </div>
          <button className="logout-button" onClick={logoutHandler}>
            {"< Log Out"}
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
          <div className="gamelistwrapper">
            <div className="game-launch" id="game-launch"></div>
            {/* If searchFilter length is more than 0
            this means the user has typed in search area
            If that's the case, check if chosenCategory includes
            what the user has typed in search area
            then render only what user has typed
            */}
            {searchFilter.length > 0
              ? chosenCategory.map(
                  (item) =>
                    item.name.toLowerCase().includes(searchFilter) &&
                    renderModal(item)
                )
              : chosenCategory.map((item) => renderModal(item))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
