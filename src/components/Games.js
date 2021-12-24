import { useEffect,useState } from "react";
import {useLocation} from "react-router-dom"
function Games() {
    const [gameList, setGameList] = useState([]);
    const { state } = useLocation();
    console.log("geçti",state);
  useEffect (() => {
    const gameListreq = fetch("http://localhost:3001/games")
    .then((res) => res.json())
    .then((result) => setGameList(result));
  }, [])
  

  console.log(gameList);
  return <div>selam</div>;
}

export default Games;
