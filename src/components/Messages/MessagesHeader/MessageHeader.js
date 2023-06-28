import React, { useState } from "react";
import { Header, Segement, Input, Icon } from "semantic-ui-react";
import "./MessageHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH_RESULTS } from "../../../store/actioncreator";
const MessageHeader = (props) => {
  const users = useSelector((state) => state);
  const dispatch = useDispatch();
  const [iconColor, setIconColor] = useState("black");
  const channelName = useSelector((state) => state.channel.name);
  const userName = useSelector((state) => state.userName);

  const [searchTrem, setSerachTrem] = useState("");
  console.log(userName);

  const handleClick = () => {
    setIconColor(iconColor === "black" ? "red" : "black");
  };
  const handleSearch = (value) => {
    setSerachTrem(value);
    props.handleSearch(searchTrem);
  };
  const handleSearchIconClick = () => {
    console.log("search icon clicked");
  };
  return (
    <div>
      <div className="header-text">
        <Header as="h2" className="header">
          <span>
            {channelName || userName}
            <Icon
              name="star outline"
              style={{ color: iconColor }}
              onClick={handleClick}
            />
            <br></br>
            {channelName ? <span>3users</span> : null}
            {userName ? <span>1user</span> : null}
          </span>
          <span>
            <Input
              name="search"
              icon="search"
              onClick={handleSearchIconClick}
              placeholder="Search Messages"
              size="mini"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </span>
        </Header>
      </div>
    </div>
  );
};

export default MessageHeader;
