import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./navprofile.css";

const NavProfile = (props) => {
  return (
    <div style={{ fontSize: 30 }} id="navprof" ref={props.profref}>
      <FontAwesomeIcon
        onClick={() => {
          props.setToolbar(!props.toolbar);
        }}
        icon={faUserCircle}
      />
    </div>
  );
};

export const NavToolbar = (props) => {
  const { setAuth, auth } = useAuth();
  const menuref = props.menuref;
  const navigation = useNavigate();
  return (
    <div
      ref={menuref}
      id={
        auth._id
          ? props.toolbar
            ? "toolbar"
            : "hiddentoolbar"
          : "hiddenverify"
      }
    >
      <div id="wrapper">
        <div id="toolbar_profile">
          <img
            onClick={() => {
              props.setToolbar(0);
              navigation("/profile");
            }}
            srcSet="animation.png"
            id="nav_img"
            alt=""
          ></img>
          <div
            onClick={() => {
              props.setToolbar(0);
              navigation("/profile");
            }}
            id="toolbar_name"
          >
            {auth.name}
          </div>
          <label
            onClick={() => {
              props.setToolbar(0);
              navigation("/profile");
            }}
            id="toolbar_sid"
          >
            {auth.sid}
          </label>
        </div>
        <div id="toolbar_buttons">
          <button
            id="logout_button"
            onClick={() => {
              setAuth({});
              localStorage.removeItem("auth");
              props.setToolbar(1);
              navigation("/");
            }}
          >
            <label id="logtools">
              Logout
              <span id="icon_logout" style={{ marginLeft: "10px" }}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavProfile;
