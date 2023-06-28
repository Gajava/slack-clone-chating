import React, { useState } from "react";
import "./sidebar.css";
import Userinfo from "./Userinfo";
import Channels from "./Channels/Channels";
import Messages from "../Messages/Messages";
import Chat from "./Private/Chat";
import Messagecomponent from "../Messages/Messagecomponent/Messagecomponent";
import Favourite from "./Favouritecomponent.js/Favourite";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container">
        <div className="sidebar">
          <Userinfo />
          <Favourite/>
          <Channels />
          <Chat />
        </div>
        <div>
          <div className="hello">
        
            <Messagecomponent/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
