import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css"
import SendIcon from "@mui/icons-material/Send";
import useAuth from "../../Hooks/useAuth";
import { AppContext } from "./appContext";
import { format } from "timeago.js";



const MessageForm = ({ message, own }) => {
  const { auth } = useAuth();
  // const { socket } = useContext(AppContext);
  // console.log(message)
  return (
    <>
      {!auth._id && <div className="alert alert-danger">Please Login</div>}
      <div className={own ? "Messagebox own" : "Messagebox"}>
        <div className="MessageTop">
          <p className="alert alert-info text-center message-date-indicator bg-warning">
            sacschl
          </p>

          <p className="message-content  message-inner">{message?.text}</p>
        </div>
        <div className="message-timestamp-left">
          {format(message?.createdAt)}
        </div>
      </div>
    </>
  );
};

export default MessageForm;


//#FC575C
//#FC9842