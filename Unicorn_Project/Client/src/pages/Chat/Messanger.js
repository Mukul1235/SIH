import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import useAuth from "../../Hooks/useAuth";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from './Sidebar';
import MessageForm from './MessageForm';
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { io } from "socket.io-client";

import "./Message.css"


const Messanger = () => {
    const { auth } = useAuth();
      const [conversations, setConversations] = useState([]);
      const [currentChat, setCurrentChat] = useState(null);
      const [messages, setMessages] = useState([]); // used to take message from backend
      const [NewMessages, setNewMessages] = useState(""); // used to take new message and then storing it into backend
  const [arrivalMessages, setArrivalMessages] = useState(null); 
  const socket = useRef();


    useEffect(() => {
      socket.current = io("ws://localhost:5001");
      socket.current.on("getMessage", (data) => {
        setArrivalMessages({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, []);
  
      useEffect(() => {
        arrivalMessages &&
          currentChat?.members.includes(arrivalMessages.sender) &&
          setMessages((prev) => [...messages, arrivalMessages]);
      }, [arrivalMessages, currentChat]);
  
  

    useEffect(() => {
      const getConversation = async () => {
        try {
          const res = await axios.get("/conversation/" + auth._id);
          setConversations(res.data);
        } catch (err) {
          console.log("error");
        }
      };
      getConversation();
    }, [auth._id]);

  // console.log(currentChat);
 
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat._id);
    
        setMessages(res.data);
      } catch (e) {
        console.log("error");
      }
    };
    getMessages();
  }, [currentChat]);
console.log(currentChat);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(currentChat);
      const message = {
        sender: auth._id,
        text: NewMessages,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(
        (members) => members !== auth._id
      );
      socket.current.emit("sendMessage", {
        senderId: auth._id,
        receiverId,
        text: NewMessages,
      });
      console.log(message);
      try {
        const res = await axios.post("/messages", message);
        setMessages([...messages, res.data]);
        setNewMessages("");
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      socket.current.emit("addUser", auth._id);
      socket.current.on("getUsers", (users) => {
        console.log(users);
      });
    }, [auth]);
  
    return (
      <>
        <Navbar></Navbar>
        <div>
          <Row>
            <Col md={4}>
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Sidebar conversations={c} currentUser={auth} />
                </div>
              ))}
            </Col>
            <Col md={8}>
              {currentChat ? (
                <>
                  <div className="messages-output">
                    {messages.map((m) => (
                      <MessageForm message={m} own={m.sender === auth._id} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <MessageForm />
                </>
              )}

              <Form>
                <Row>
                  <Col md={11}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Your Message"
                        disabled={!auth._id}
                        onChange={(e) => setNewMessages(e.target.value)}
                        value={NewMessages}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(to bottom right,rgb(230, 30, 123), rgba(255, 0, 0, 0.819), rgba(255, 179, 0, 0.778))",
                      }}
                      disabled={!auth._id}
                      onClick={handleSubmit}
                    >
                      <SendIcon />
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </>
    );
}

export default Messanger
