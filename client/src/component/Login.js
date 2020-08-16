/*eslint-disable */
import React, { useState } from "react";
import "../App.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateinfo } from "../actions";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const loginInfoReducer = useSelector((state) => state.loginInfoReducer);

  const updateReduxInfo = async () => {
    const loginValue = await checkLogin({ username, password });
    if (loginValue) {
      setNotification(false);
      dispatch(updateinfo(loginValue));
      history.push("/diary");
    } else {
      setMessage("Incorrect Info");
      setNotification(true);
    }
  };

  const checkLogin = (user) => {
    const { username, password } = user;
    const query = `
            query {
                    findUser(username:"${username}", password:"${password}") {
                    id,
                    username,
                    password
                }
            }`;

    return fetch("/graphqlfinduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => data.data.findUser);
  };

  return (
    <div className="login">
      <section className="hero is-fullheight is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Login</h1>
            <p>Log in to create and upload pictures onto your online diary</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateReduxInfo();
              }}
            >
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Text input"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Text input"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="control">
                <button className="button is-link" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <div
              className={`notification is-link ${
                notification ? "display-notification" : "hide-notification"
              }`}
            >
              <button
                className="delete"
                onClick={() => {
                  setNotification(false);
                }}
              ></button>
              {message}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
