import { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router";
import {Link} from "react-router-dom"

function Login() {
  const history = useNavigate();
  const [vusername, setUsername] = useState("");
  const [vpassword, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [verified, setVerified] = useState(true);

  function submitLogin() {
    const req = fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: vusername,
        password: vpassword,
      }),
    })
      .then((res) => res.json())
      .then((result) => 
        result.status === "success"
          ? (
            setTimeout(() => {
              history("/gamespage", {state: result.player});
            }, 1200)
            )
          : setVerified(false)
      );

    // res.status === 200
    //     ? setTimeout(() => {
    //         history("/gamespage");
    //       }, 1200)
    //     : setVerified(false);

    req.catch((res) => alert("An error occured."));
  }
  return (
    <div>
      {!verified && (
        <p className="wronglogin">Username or password is wrong.</p>
      )}
      <input
        className="username-input-area"
        type="text"
        placeholder="User Name"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="password-input-area"
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="submitbutton" onClick={submitLogin}>
        {" "}
        Submit{" "}
      </button>
    </div>
  );
}

export default Login;
