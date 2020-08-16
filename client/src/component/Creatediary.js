/*eslint-disable */
import React, { useState, useEffect } from "react";
import "../App.scss";
import { useSelector, useDispatch } from "react-redux";
import { updatediaryinfo, updateinfo } from "../actions";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";

function CreateDiary() {
  const history = useHistory();
  const loginInfoReducer = useSelector((state) => state.loginInfoReducer);
  const [title, setTitle] = useState(moment().format("MMMM Do YYYY, h:mm a"));
  const [text, setText] = useState("");

  const [newImage, setNewImage] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {}, [text]);
  const diarySubmit = (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append("image", newImage[0]);
    bodyFormData.append("image", newImage[1]);
    bodyFormData.append("image", newImage[2]);
    bodyFormData.set("username", loginInfoReducer.username);
    bodyFormData.set("userID", loginInfoReducer.id);
    bodyFormData.set("text", text);
    bodyFormData.set("title", title);
    axios({
      method: "post",
      url: "/upload",
      data: bodyFormData,
      headers: {
        // 'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        // dispatching the index only

        dispatch(updatediaryinfo(response.data));
        // update response.data
        history.push("/diary");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  return (
    <div className="creatediary">
      <section className="hero is-fullheight is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            {Object.keys(loginInfoReducer).length ? (
              <>
                <h1>Create Diary</h1>
                <form
                  onSubmit={(e) => {
                    diarySubmit(e);
                  }}
                >
                  <input
                    className="input"
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    placeholder="Title"
                    required
                  />
                  <input
                    accept="image/*"
                    type="file"
                    name="image"
                    multiple
                    onChange={(e) => {
                      setNewImage(e.target.files);
                    }}
                  />
                  <textarea
                    rows={10}
                    name="testing"
                    className="textarea"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    value={text}
                    placeholder="Today was ..."
                  ></textarea>
                  <button className="button is-link" type="submit">
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <div className="diary-empty">
                <h1 className="title">Not logged In</h1>
                <h2 className="subtitle">
                  Looks like you'll have to log in or create an account
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
  /*eslint-disable */
}

export default CreateDiary;
