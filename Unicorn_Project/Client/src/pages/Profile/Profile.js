import "./Profile.css";
import Card from "./Card";
import useAuth from "../../Hooks/useAuth";
// import { useState } from "react";

const Profile = () => {
  const { auth } = useAuth();
  console.log(auth);

  // const [check, setcheck] = useState();

  return (
    <div className="container">
      <div className="cards">
        <label id="nothingLeft">
          <div className="card">
            <div className="image">
              <img srcSet="assets/logo.png" alt=""></img>
            </div>
            <div className="infos">
              <span className="name">Nothing Left</span>
              <span className="lorem">All Done</span>
            </div>
            <a href="/contact" className="btn-contact">
              details
            </a>
          </div>
        </label>
        <Card on="s1" id="slide1" name="Cat" interests={["treking", "music"]} />
        <Card id="slide1" name="Cat" interests={["treking", "music"]} />
      </div>
    </div>
  );
};

export default Profile;
