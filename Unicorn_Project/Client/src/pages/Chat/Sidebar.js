import React, { useContext, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import "./Sidebar.css"
import useAuth from "../../Hooks/useAuth";
import { AppContext } from './appContext';
import axios from 'axios';

const Sidebar = ({ conversations, currentUser }) => {
  const [userName, setUser] = useState(null);
//   console.log(conversations);
  const rooms = ["first room ", "second room ", "third room"];
  const { auth } = useAuth();
  const {
    socket,
    setmembers,
    members,
    setCurrentRoom,
    setRooms,
    setPrivateMemberMsg,
    privateMemberMsg,
    room,
  } = useContext(AppContext);
  // console.log(auth)
  // console.log(auth);
  // console.log(socket);

  // socket.off("new-user").on("new-user", (payload) => {

  // });

    useEffect(() => {
      const frientId = conversations.members.find((m) => m !== currentUser._id);

      const getUser = async () => {
        try {
            const res = await axios.get("/profile/GetUser/" + frientId);
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, [currentUser, conversations]);
    // console.log(userName?.fakeName);
   
//   if (!auth._id) {
//     return <></>;
//   }
  

  return (
    <>
          <h2>Available rooms</h2>
        
              <ListGroup>
                  {rooms.map((room, idx) => (
                      <ListGroup.Item key={idx}>{room}</ListGroup.Item>
                  ))}
              </ListGroup>
      <h2>Members</h2>
     
          <ListGroup.Item >{userName?.fakeName}</ListGroup.Item>
    
    </>
  );
};

export default Sidebar
