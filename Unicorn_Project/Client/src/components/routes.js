import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Authentication/login";
import Home from "./home";
import SignupForm from "./Authentication/signup";
import Profile from "../pages/Profile/Profile";
import CompleteYourProfile from "./completeprofile";
import Confess from "../pages/Confession/confess";
import Chat from "../pages/Chat/Messanger"
import { useState } from "react";
import { AppContext, socket } from "../pages/Chat/appContext";

const RoutesDefiner = () => {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [members, setmembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [privateMemberMsg, setPrivateMemberMsg] = useState([]);
    const [newMessages, setNewMessages] = useState({});
    return (
      <AppContext.Provider
        value={{
          socket,
          currentRoom,
          setCurrentRoom,
          members,
          setmembers,
          messages,
          setMessages,
          privateMemberMsg,
          setPrivateMemberMsg,
          setNewMessages,
          newMessages,
          rooms,
          setRooms,
        }}
      >
        <BrowserRouter>
          <Routes>

             <Route path="/" element={<Home />}></Route>
            <Route path="login" element={<LoginForm />}></Route>
            <Route path="register" element={<SignupForm />}></Route>
            <Route
              path="completeprofile"
              element={<CompleteYourProfile />}
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/confess" element={<Confess />}></Route>
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    );
}

export default RoutesDefiner;

