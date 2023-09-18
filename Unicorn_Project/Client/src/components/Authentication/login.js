import "./auth.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { AppContext } from "../../pages/Chat/appContext";

const LoginForm = () => {
  const { auth, setAuth } = useAuth();
  const { socket } = useContext(AppContext);

  const navigation = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const Login = async () => {
    try {
      const res = await axios.post("/login", { user: user });
      setAuth(res.data);
      //socket work
      socket.emit("new-user");
      navigation("/");
    } catch {
      alert("Invalid Credentials");
    }
  };




  if (auth._id) return <Navigate to="/" />;

  return (
    <div className="form">
      <form>
        <div id="authform">
          <h1 className="login">Login</h1>
          <div className="btn_auth">
            <button id="google_auth">
              <img id="google_icon" srcSet="icon_google.svg" alt="" />
              <span id="gg">Continue with Google</span>
            </button>
          </div>
          <hr />
          <label id="or">or</label>
          <div className="Login">
            <div className="input">
              <label>Email Address</label>
              <br></br>
              <input
                type="email"
                placeholder=""
                name="email"
                onChange={handleChange}
                value={user.email}
              ></input>
              <label>Password</label>
              <br></br>
              <input
                type="password"
                placeholder=""
                name="password"
                onChange={handleChange}
                value={user.password}
              ></input>
            </div>
            <div id="nxt" onClick={Login}>
              Next
            </div>
            <br></br>
            <label id="signup">
              Don't have an account? <Link to="/register">SignUp</Link>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
