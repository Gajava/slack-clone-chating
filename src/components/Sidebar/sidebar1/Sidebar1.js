import React, { useEffect } from "react";
import { useState } from "react";
import "./sidebar1.css";
import Messages from "../../Messages/Messages";
import { useSelector, useDispatch } from "react-redux";
import Groupchannel from "../Channels/Groupchannel";
import firebase from "../../../server/firebase";
const Sidebar1 = (props) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const users = useSelector((state) => state);
  const msgs = useSelector((state) => state.Messages);

  console.log(msgs);
  console.log(props.Image)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("messages")
          .once("value");
        if (snapshot.exists()) {
          const records = snapshot.val();
          console.log("fetched records", records);
          dispatch({ type: "Messages", payload: Object.values(records) });
        }
      } catch (error) {
        console.log("error fetching records", error);
      }
    };
    fetchMessages();
  }, []);

  console.log(props.query);
  console.log(props.Image)
  return (
   
      <div className="sidebar1">
        <div className="hiiii">
          {props.Image?.map((image, index) => (
          <img key={index} src={Image} alt={`Image $ {index}`} height={350} width={400} />
        ))}
        </div>
        <div style={{ marginRight: 900 }}>
          {props.query.length <= 0 ? (
            <>
         
              {msgs
                ?.filter(
                  (data) =>
                    data.GroupId === users.channel.name ||
                    data.GroupId === users.userName
                )
                ?.map((msg, index) => (
                  <div key={index}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <img
                          className="message-photo"
                          src={msg.PhotoURL}
                          style={{
                            width: "50px",
                            height: "30px",
                          }}
                          alt=""
                        />
                      </div>

                      <div className="msg">
                        <span className="user">{msg.userName}</span>
                        <span className="time">{msg.content}</span>
                      </div>
                      <div style={{ marginLeft: "10px" }}>{msg.timestamp}</div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <>
              {props.query
                ?.filter(
                  (data) =>
                    data.GroupId === users.channel.name ||
                    data.GroupId === users.userName
                )
                ?.map((msg, index) => (
                  <div key={index}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <img
                          className="message-photo"
                          src={msg.PhotoURL}
                          style={{
                            width: "50px",
                            height: "30px",
                          }}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
     
      </div>

  );
};

export default Sidebar1;
