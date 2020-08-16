/*eslint-disable */
import React, { useState } from "react";
import "../App.scss";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(false);

  const updateReduxInfo = async () => {
    const duplicateValue = await checkDuplicate({ username, password });
    if (duplicateValue === null) {
      await addMutationPost({ username, password });
      setMessage("User Created");
      setNotification(true);
    } else {
      setMessage("Another Username found, User not created");
      setNotification(true);
    }
  };

  const checkDuplicate = (values) => {
    const query = `
            query {
                    findDuplicate(username:"${values.username}") {
                    id,
                    username,
                    password
                }
            }`;

    return fetch("/graphqlfindduplicateuser", {
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
      .then((data) => data.data.findDuplicate);
  };

  const addMutationPost = (values) => {
    const mutation = `
        mutation CreatePerson($username: String!, $password: String!){
            person(username: $username, password: $password){
                id,
                username,
                password
            }
        }
        `;

    return fetch("/graphqlfindduplicateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          username: values.username,
          password: values.password,
        },
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        return data.data.person;
      });
  };

  return (
    <div className="createuser">
      <section className="hero is-fullheight is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Create User</h1>
            <p>
              Create Account to create and upload pictures onto your online
              diary
            </p>
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

export default CreateUser;
