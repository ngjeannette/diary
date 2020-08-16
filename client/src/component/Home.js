/*eslint-disable */
import React from "react";
import "../App.scss";
import labtop from "../photo/labtop.png";
import creatediary from "../photo/creatediary.png";
function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-intro">
          <h1>DiaryApp</h1>
          <p>
            Twitch tail in permanent irritation attack dog, run away and pretend
            to be victim but i bet my nine lives on you-oooo-ooo-hooo and trip
            on catnip. Flex claws on the human's belly and purr like a lawnmower
            you are a captive audience while sitting on the toilet, pet me so
            grab pompom in mouth and put in water dish sleeps on my head for
            chew the plant. I’m so hungry i’m so hungry but ew not for that purr
            as loud as possible, be the most annoying cat that you can, and,
            knock everything off the table eat
          </p>
        </div>
        <div className="home-image">
          <img src={labtop} alt="diary image in labtop" />
        </div>
      </div>
      <div className="home-container reverse">
        <div className="home-intro ">
          <h1>DiaryApp</h1>
          <p>
            Twitch tail in permanent irritation attack dog, run away and pretend
            to be victim but i bet my nine lives on you-oooo-ooo-hooo and trip
            on catnip. Flex claws on the human's belly and purr like a lawnmower
            you are a captive audience while sitting on the toilet, pet me so
            grab pompom in mouth and put in water dish sleeps on my head for
            chew the plant. I’m so hungry i’m so hungry but ew not for that purr
            as loud as possible, be the most annoying cat that you can, and,
            knock everything off the table eat
          </p>
        </div>
        <div className="home-image">
          <img src={creatediary} alt="create page image in labtop" />
        </div>
      </div>
    </div>
  );
}
export default Home;
