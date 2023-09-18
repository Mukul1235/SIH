import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCake,
  faAmbulance,
} from "@fortawesome/free-solid-svg-icons";
import TinderCard from "react-tinder-card";

const onSwipe = (direction) => {
  console.log("You swiped: " + direction);
};

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + " left the screen");
};

const Card = (props) => {
  // console.log(props.interests);
  
  const interests = [...props.interests];

  return (
    <TinderCard
      onSwipe={onSwipe}
      onCardLeftScreen={() => onCardLeftScreen("fooBar")}
      preventSwipe={["right", "left"]}
    >
      <label id={props.id}>
        <div className="card">
          <div className="image">
            <img srcSet="assets/logo.png" alt=""></img>
          </div>
          <div className="infos">
            <span className="name">{props.name}</span>
            <span className="lorem">
              {props.interests.map((int, index) => (
                <div key={index}>{int}</div>
              ))}
            </span>
          </div>
          <a href="/contact" className="btn-contact">
            details
          </a>
          <div className="socials">
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faCake} />
            <FontAwesomeIcon icon={faAmbulance} />
          </div>
        </div>
      </label>
    </TinderCard>
  );
};

export default Card;
