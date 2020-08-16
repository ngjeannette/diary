/*eslint-disable */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./component/Nav";
import Home from "./component/Home";
import CreateUser from "./component/Createuser";
import Login from "./component/Login";
import Diary from "./component/Diary";
import CreateDiary from "./component/Creatediary";

function App() {
  return (
    <Router>
      <div className="Main">
        <Nav />
        <div className="content">
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} isAuthed={true} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} isAuthed={true} />}
          />
          <Route
            path="/createuser"
            render={(props) => <CreateUser {...props} isAuthed={true} />}
          />
          <Route
            path="/diary"
            render={(props) => <Diary {...props} isAuthed={true} />}
          />
          <Route
            path="/creatediary"
            render={(props) => <CreateDiary {...props} isAuthed={true} />}
          />
        </div>
      </div>
    </Router>
  );
}
export default App;
