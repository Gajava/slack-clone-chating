import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Menu, Icon } from 'semantic-ui-react';
import firebase from '../../../server/firebase'
const Chat = () => {
 const users = useSelector((state) => state.userName);
  const dispatch = useDispatch()
  const [displayNames, setDisplayNames] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [name, setName] = useState(null);
   useEffect(() => {
     const database = firebase.database();
     database
       .ref("users")
       .once("value")
       .then((snapshot) => {
         const usersname = snapshot.val();
         
         const names = Object.values(usersname).map(user =>
         user.displayName,
        
           
       );
         console.log("Fetched records:", usersname);
         setDisplayNames(names)
         setTotalCount(names.length);
       })
       .catch((error) => {
         console.error("Error fetching records:", error);
       });
   }, []);
  
  const handleChannelClick = (names) => {
    setName(names)
    dispatch({ type: "SET_USER", payload: names });
    console.log(names);
  }
  console.log(users.userName)
  console.log()
  return (
    <Menu.Item style={{ fontsize: "17px", display: "flex" }}>
      <div 
        style={{
          color: "white",
          position: "relative",
          top: "180px",
          marginLeft: "50px",
        fontSize:"20px"
        }} >
        <Icon name="mail" /> DirectMessages ({totalCount})<br></br>
        <div className='private-chat'>
          {displayNames.map((names, index) => (
            <p key={index} onClick={() => handleChannelClick(names)}>
              {names}
            </p>
          ))}
        </div>
      </div>
    </Menu.Item>
  );
}

export default Chat



