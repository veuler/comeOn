import { useState } from "react";
import "./styles/login.css";
import { useNavigate } from "react-router";
import logo from "./images/logo2.png";

function Login() {
  const history = useNavigate();

  const [vusername, setUsername] = useState("");
  const [vpassword, setPassword] = useState("");
  const [verified, setVerified] = useState(true);

  // If the login is successful
  // pass the username and password to /gamespage
  // otherwise show an alert
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
          ? setTimeout(() => {
              history("/gamespage", {
                state: { results: result.player, name: vusername },
              });
            }, 1200)
          : setVerified(false)
      );
    req.catch((res) => alert("An error occured."));
  }
  return (
    <div>
      <img className="logo2" src={logo} />
      {/* If the username or password is wrong, show the alert */}
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
        Login{" "}
      </button>
    </div>
  );
}

export default Login;
