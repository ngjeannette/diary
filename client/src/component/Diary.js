/*eslint-disable */
import React, { useState, useEffect } from "react";
import "../App.scss";
import { useSelector, useDispatch } from "react-redux";
import { updatediaryinfo, updatediaryempty } from "../actions";
import moment from "moment";
import Carousel from "react-bootstrap/Carousel";

function Diary() {
  const loginInfoReducer = useSelector((state) => state.loginInfoReducer);
  const diaryEntryReducer = useSelector((state) => state.diaryEntryReducer);

  useEffect(() => {}, [loginInfoReducer]);
  useEffect(() => {
    debugger;
    if (
      loginInfoReducer !== null &&
      Object.keys(loginInfoReducer).length === 0
    ) {
      dispatch(updatediaryempty());
    }
  }, [diaryEntryReducer]);
  const dispatch = useDispatch();
  const [timerClass, setTimerClass] = useState("");
  const [diaryList, setDiaryList] = useState([]);
  const [diaryEntry, setDiaryEntry] = useState(0);

  useEffect(() => {
    if (loginInfoReducer !== null && Object.keys(loginInfoReducer).length > 0) {
      dispatch(updatediaryinfo(diaryList));
      setDiaryEntry(diaryList.length - 1);
    } else {
      dispatch(updatediaryempty());
    }
  }, [diaryList]);

  useEffect(() => {
    setTimeout(function () {
      setTimerClass("remove");
    }, 1000);
  }, []);

  useEffect(() => {
    if (loginInfoReducer !== null && Object.keys(loginInfoReducer).length > 0)
      getDiaryList();
  }, [loginInfoReducer]);

  const getDiaryList = () => {
    const query = `
             query {
                finddiaries(userID:"${loginInfoReducer.id}") {
                    username,
                    userID,
                    text,
                    title,
                    createdAt,
                    image {
                        fieldname
                        originalname
                        encoding
                        mimetype
                        size
                        acl
                        etag
                        location
                    }
                }
            }
        `;
    fetch("/graphqlfinddiaries", {
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
      .then((data) => {
        setDiaryList(data.data.finddiaries);
      });
  };

  return (
    <div className="diary">
      <section className="hero is-fullheight is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <button className={`button is-primary is-loading ${timerClass}`}>
              Loading
            </button>
            {timerClass !== "" && (
              <>
                {diaryList.length > 0 && diaryEntry >= 0 && <h1>Diary</h1>}
                <div className="diary-select">
                  {diaryList.length > 0 && diaryEntry >= 0 && (
                    <div className="select">
                      <select
                        onChange={(e) => {
                          setDiaryEntry(e.target.value);
                        }}
                        value={diaryEntry}
                      >
                        {diaryList.map((item, index) => (
                          <option key={index} value={index}>
                            {item.title} -{" "}
                            {moment(Number(item.createdAt)).format(
                              "MMM DD YYYY"
                            )}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="diary-entry-container">
                  {diaryList.length > 0 && diaryEntry >= 0 ? (
                    <div className="diary-entry">
                      <h2>{diaryList[diaryEntry].title}</h2>
                      <textarea rows={10} className="textarea" readOnly>
                        {diaryList[diaryEntry].text}
                      </textarea>
                      {diaryList[diaryEntry].image.length > 0 && (
                        <Carousel>
                          {diaryList[diaryEntry].image.map(
                            (imageitem, index) => (
                              <Carousel.Item key={index}>
                                <img
                                  className="d-block w-100"
                                  src={imageitem.location}
                                  alt="First slide"
                                />
                              </Carousel.Item>
                            )
                          )}
                        </Carousel>
                      )}
                    </div>
                  ) : (
                    <div className="diary-empty">
                      <h1 className="title">No Diary Entry</h1>
                      <h2 className="subtitle">
                        Looks like you'll have to create a new entry
                      </h2>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Diary;
