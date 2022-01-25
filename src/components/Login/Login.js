import React from "react";
import { useState } from "react";
import axios from "axios";

const loginURL = "http://127.0.0.1:5000/login";

const Login = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnClick = () => {
    setValidateMessage("");

    if (login.trim() === "") {
      setValidateMessage("Fill up username!");
    } else if (password.trim() === "") {
      setValidateMessage("Fill up password!");
    } else {
      axios
        .post(loginURL, {
          login: login,
          password: password,
        })
        .then((response) => {
          props.setToken(response.data.access_token);
        })
        .catch((error) => {
          if (error.response) {
            setValidateMessage(error.response.data.msg);
          }
        });
    }
  };

  return (
    <div className="background_col">
      <div className="login-form">
        <p>Please log in</p>
        <div>
          <p>
            <label>Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={login}
              onChange={handleLoginChange}
            />
          </p>
          <p>
            <label>Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </p>
          <br />
          <button className="button-form" onClick={handleOnClick}>
            Login
          </button>
          <p className="error_message">{validateMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
