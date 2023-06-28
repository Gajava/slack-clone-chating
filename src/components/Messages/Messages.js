import React, { useState } from "react";
import MessageHeader from "./MessagesHeader/MessageHeader";
import MessageInput from "./MessageInput/MessageInput";
// import  MessageContent  "./MessageContent/MessageContent"
import Sidebar1 from "../Sidebar/sidebar1/Sidebar1";
const Messages = () => {
  const [displayedMessages, setDisplayedMessage] = useState([]);
  const [image, setImage] = useState(null);
  console.log(typeof Image);
  return (
    <div
      style={{
        flexDirection: "column",
        border: "1px solid black",
        height: "100vh",
        width:"100vh"
      }}
    >
      <MessageHeader />
      <Sidebar1 messages={displayedMessages} Image={image} />
      <MessageInput
        setDisplayedMessage={setDisplayedMessage}
        imageHandler={(image) => setImage(image)}
      />
    </div>
  );
};
export default Messages;
