import React, { useState } from "react";
import { useSelector } from "react-redux";
import MessageHeader from "../MessagesHeader/MessageHeader";
import MessageInput from "../MessageInput/MessageInput";
import Sidebar1 from "../../Sidebar/sidebar1/Sidebar1";
const Messagecomponent = (props) => {
  const [displayedMessages, setDisplayedMessage] = useState([]);
  const [image, setImage] = useState(null);
  const [query, setQuery] = useState("");
const msgs = useSelector((state) => state.Messages);
  const handleData = (data) => {
    const newData = msgs.filter((q) => q.content?.toLowerCase().includes(data?.toLowerCase()))
    setQuery(newData)
  }
  console.log(query);
  return (
    <div>
      <MessageHeader handleSearch={(data) => handleData(data)} />

      <Sidebar1 messages={displayedMessages} Image={image} query={query} />
      <MessageInput
        setDisplayedMessage={setDisplayedMessage}
        imageHandler={(image) => setImage(image)}
        image={image}
      />
    </div>
  );
};

export default Messagecomponent;
