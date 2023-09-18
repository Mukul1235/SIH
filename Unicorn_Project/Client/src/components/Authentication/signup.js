import "./auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import OtpStatus from "./otp_status";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const SignupForm = () => {
  const { auth, setAuth } = useAuth();
  const navigation = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prevstate) => ({ ...prevstate, [name]: value }));
  };

  // Clicked For OTP
  const [otp_click, set_otp_click] = useState(0);
  // Waiting otp
  const [wait_sent, setwaitsent] = useState(0);
  // Sent otp
  const [sent_otp, set_sent_otp] = useState(0);
  // Resend otp
  const [uresend, setUresend] = useState(0);
  // Unable to connect
  const [untc, setuntc] = useState(0);
  // Verfication waiting
  const [wait_verfiy, setwait_verify] = useState(0);
  // Verified
  const [verified, setverified] = useState(0);
  // button disable
  const [btnd, setbtnd] = useState(0);
  // Wrong Otp
  const [wrongotp, setwrongotp] = useState(0);
  // Otp input
  const [Otp, setOtp] = useState("");
  // Change clicked
  const [changeclick, setchangeclick] = useState(0);

  const otp_generator = async () => {
    if (validateEmail(user.email)) {
      const userexist = await axios.post("/userExists", { email: user.email });
      if (userexist.data) {
        alert("User Already Exists");
        return;
      }
      set_otp_click(1);
      setwaitsent(1);
      set_sent_otp(0);
      setuntc(0);
      setchangeclick(0);
      setwrongotp(0);
      setUresend(1);
      setbtnd(1);
      setOtp("");
      const data = { email: user.email };
      try {
        await axios.post("/signup", data);
        set_sent_otp(1);
        setbtnd(0);
      } catch {
        setuntc(1);
      }
      setwaitsent(0);
      setchangeclick(1);
      setUresend(0);
    } else alert("Enter Valid Email");
  };

  const verifyotp = async () => {
    if (Otp.length === 6) {
      setUresend(1);
      setwait_verify(1);
      setwrongotp(0);
      set_sent_otp(0);
      setchangeclick(0);
      set_sent_otp(0);
      setbtnd(1);
      const data = { email: user.email, otp: Otp };
      const res = await axios.post("/signup/verify", data);
      console.log(res.data);
      if (res.data) {
        setverified(1);
        setwait_verify(0);
      } else {
        setwrongotp(1);
        setOtp("");
        setwait_verify(0);
        setbtnd(1);
        setUresend(0);
        setbtnd(0);
        setchangeclick(1);
      }
    } else {
      setwrongotp(1);
      setOtp("");
      set_sent_otp(0);
    }
  };

  const change_email = () => {
    setUser({ email: "" });
    setOtp(" ");
    set_otp_click(0);
    setchangeclick(0);
    set_sent_otp(0);
  };

  const Signedin = async () => {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(user.password)
    ) {
      const res = await axios.post("/userAdder", user);
      setAuth(res.data);
      navigation('/completeprofile');
    } else {
      alert("Enter Valid Password");
    }
  };

  if (auth._id) return <Navigate to="/" />;

  return (
    <div className="form">
      <form>
        <div id={"authform"}>
          <h1 className="signup">signup</h1>
          <div className="btn_auth">
            <button id="google_auth">
              <img id="google_icon" srcSet="icon_google.svg" alt="" />
              <span id="gg">Continue with Google</span>
            </button>
          </div>
          <hr />
          <label id="or">or</label>
          <div className="Signup">
            <div className="input">
              <div className="eaverify">
                <div className="email_address">
                  <label>Email Address</label>
                  <br></br>
                  <input
                    className={otp_click ? "inea" : "ea"}
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  ></input>
                  <div
                    className="eachange"
                    id={changeclick ? "chn" : "nchn"}
                    onClick={change_email}
                  >
                    Change
                  </div>
                </div>
                <div className="otp_container">
                  <OtpStatus
                    otp_click={otp_click}
                    wait_sent={wait_sent}
                    sent_otp={sent_otp}
                    untc={untc}
                    wait_verfiy={wait_verfiy}
                    verified={verified}
                    wrongotp={wrongotp}
                  />
                  <div id="otp_div">
                    <input
                      className={otp_click ? "otpclicked" : "otp"}
                      type="otp"
                      placeholder=""
                      maxLength={6}
                      value={Otp}
                      id={uresend ? "otpd" : "idotp"}
                      onChange={(e) => setOtp(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>

              <div
                id={
                  otp_click
                    ? verified
                      ? "password"
                      : "visibility"
                    : "hiddenverify"
                }
              >
                <label className="new_pass">Password</label>
                <br></br>
                <input
                  className="newpass"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <label
              id={otp_click && !uresend ? "dispin" : "hiddenverify"}
              style={{
                color: "red",
                fontWeight: 900,
                fontSize: 15,
              }}
              onClick={otp_generator}
            >
              Resend Otp
            </label>
            <div
              onClick={otp_generator}
              id="nxt"
              className={otp_click ? "hiddenxt" : ""}
            >
              Next
            </div>
            <div
              onClick={verifyotp}
              className="otpverifier"
              id={
                otp_click && !verified
                  ? btnd
                    ? "showverfiydisabled"
                    : "showverfiy"
                  : "hiddenverify"
              }
            >
              Verify Otp
            </div>
            <div
              onClick={Signedin}
              id="nxt_signup"
              className={verified ? "" : "hiddenxt"}
            >
              SignUp
            </div>
            <br></br>
            <label id="signup">
              Already Registered? <Link to="/login">LogIn</Link>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
