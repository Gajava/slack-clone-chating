import React, { useState, useEffect } from "react";
import { Menu, Icon, Modal } from "semantic-ui-react";
import firebase from "../../../server/firebase";
import "firebase/database";
import "./Channels.css";
import * as actions from "../../../store/actioncreator";
import { useDispatch, useSelector } from "react-redux";
import Groupchannel from "./Groupchannel";
const Channels = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
//  const [TotalCount, setTotalCount] = useState(0); // State for channel count
  const [records, setRecords] = useState([]);
  const channels = useSelector((state) => state.channels);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const database = firebase.database();
    database
      .ref("channels")
      .once("value")
      .then((snapshot) => {
        // if (typeof snapshot.size === 'number') {
        //   setChannelCount(snapshot.size);
        // }
      // setTotalCount(snapshot.size );
        const records = snapshot.val();
        console.log("Fetched records:", records);
        setRecords(records);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
      });
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSave = () => {
    const newChannel = {
      name: channelName,
      description: channelDescription,
      
    };

    firebase
      .database()
      .ref("channels")
      .push(newChannel)
      .then(() => {
        setChannelName("");
        setChannelDescription("");
        setIsOpen(false);
      //  setTotalCount(prevcount => prevcount +1);
    
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(actions.AddChannel(newChannel));
  };
  const handleChannelClick = (channel) => {
    console.log(channel);
    setSelectedChannel(channel);
    dispatch({ type: "SET_CHANNEL", payload: channel });
  };
  console.log(channels);
  return (
    <>
      <span className="channel-icon">
        <Icon name="exchange" /> Channels 
   
        {/* {{ TotalCount }} */}
      </span>
      {/* Display the channel count */}
      <span>
        <button className="add-button" onClick={handleOpen}>
          +
        </button>
        <ul className="channel-dispaly">
          {Object.values(records).map((record, index) => (
            <li key={index} onClick={() => handleChannelClick(record)}>
              {record.name}
            </li>
          ))}
        </ul>
      </span>
      <Modal open={isOpen} onClose={handleClose}>
        <Modal.Header>Add Channel</Modal.Header>
        <Modal.Content>
          <div>
            <label> Name of the Channel:</label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <br></br>
          <div>
            <label>About of the channel :</label>
            <input
              type="text"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <button onClick={handleSave}>Save</button>&nbsp;&nbsp;
          <button onClick={handleClose}>Cancel</button>
        </Modal.Actions>
      </Modal>
      <div style={{ marginRight: 300 }}>
        <ul className="channel-list">
          {channels.map((channel) => (
            <li key={channel.id} onClick={() => handleChannelClick(channel)}>
              #{channel.name}
            </li>
          ))}
        </ul>
      </div>

      <Groupchannel />
    </>
  );
};

export default Channels;
