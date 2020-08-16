/*eslint-disable */
import React, { useEffect, useState } from "react";
import "../App.scss";
import { useSelector, useDispatch } from "react-redux";
import { updatempty, updatediaryempty } from "../actions";
import { Link } from "react-router-dom";

function Nav() {
  const loginInfoReducer = useSelector((state) => state.loginInfoReducer);
  const [loginUsername, setLoginUsername] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {}, []);

  useEffect(() => {
    if (loginInfoReducer !== null && Object.keys(loginInfoReducer).length > 0) {
      setLoginUsername(loginInfoReducer.username);
    }
  }, [loginInfoReducer]);

  return (
    <>
      <nav>
        <div className="navbar-start">
          <a
            className="navbar-item"
            target="_blank"
            rel="noopener noreferrer"
            href="https://flaviocopes.com/sample-app-ideas/"
          >
            Project 8
          </a>
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/login" className="navbar-item">
            Login
          </Link>
          <Link to="/createuser" className="navbar-item">
            Sign up
          </Link>
          <Link to="/creatediary" className="navbar-item">
            Create Diary
          </Link>
          {loginUsername && (
            <>
              <Link to="/diary" className="navbar-item">
                Diary
              </Link>
              <Link
                to="/"
                className="navbar-item"
                onClick={() => {
                  dispatch(updatempty());
                  dispatch(updatediaryempty());
                }}
              >
                Logout
              </Link>
              <span className="tag is-primary is-light is-medium loggedin">
                {loginUsername}
              </span>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
export default Nav;
