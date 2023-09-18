const OtpStatus = (props) => {
  return (
    <label className={props.otp_click ? "otpclicked" : "otp"} id="lblotp">
      OTP
      <span
        style={{
          marginLeft: 10,
          color: "blue",
          fontWeight: 900,
          fontSize: 14,
        }}
        id={props.wait_sent ? "dispin" : "hiddenverify"}
      >
        Sending...
      </span>
      <span
        style={{
          marginLeft: 10,
          color: "green",
          fontWeight: 900,
          fontSize: 13,
        }}
        id={props.sent_otp ? "dispin" : "hiddenverify"}
      >
        Sent Successfully
      </span>
      <span
        style={{
          marginLeft: 10,
          color: "red",
          fontWeight: 900,
          fontSize: 13,
        }}
        id={props.untc ? "dispinb" : "hiddenverify"}
      >
        Unable to
        <br></br>
        connect
      </span>
      <span
        style={{
          marginLeft: 10,
          color: "blue",
          fontWeight: 900,
          fontSize: 14,
        }}
        id={props.wait_verfiy ? "dispin" : "hiddenverify"}
      >
        Verifying...
      </span>
      <span
        style={{
          marginLeft: 10,
          color: "green",
          fontWeight: 900,
          fontSize: 14,
        }}
        id={props.verified ? "dispin" : "hiddenverify"}
      >
        Verified
      </span>
      <span
        style={{
          marginLeft: 10,
          color: "red",
          fontWeight: 900,
          fontSize: 13,
        }}
        id={props.wrongotp ? "dispinb" : "hiddenverify"}
      >
        Wrong OTP
        <br></br>
        or expired
      </span>
    </label>
  );
};

export default OtpStatus;