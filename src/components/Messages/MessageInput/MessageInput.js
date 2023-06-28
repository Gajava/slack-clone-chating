import React, { useState } from "react";
import "./MessageInput.css";
import { Input, Button } from "semantic-ui-react";
import firebase from "../../../server/firebase";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ImageUploader from "../Imageuploader/Imageupload";
const MessageInput = (props) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const channelId = useSelector((state) => state.channel.name);
  const userNameId = useSelector((state) => state.userName);

  const [userName, PhotoURL] = useSelector((state) => [
    state.userName,
    state.PhotoURL,
  ]);
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const handleSendClick = () => {
    if (message.trim() !== "") {
      console.log("not error");
      const newMessage = {
        content: message,
        GroupId: channelId || userNameId,
        Id: new Date().getTime(),
        timestamp: moment().format(" HH:mm:ss"),
        image: uploadedFiles,
        userName: userName,
        PhotoURL: PhotoURL,
      };
      props.setDisplayedMessage((msgs) => [newMessage, ...msgs]);
      setMessage("");
      setUploadedFiles(null);
      firebase
        .database()
        .ref("messages")
        .push(JSON.parse(JSON.stringify(newMessage)))
        .then(() => {
          dispatch({ type: "Update_Messages", payload: newMessage });
          console.log("message stored in data successfully");
        })
        .catch((error) => {
          console.log("error storing message", error);
        });
      console.log("New Message", newMessage);
    } else {
      console.log("error");
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleImagesave = (imageData) => {
    setUploadedFiles(imageData);
    const imageObject = { data: imageData };
    props.imageHandler(imageObject);
    setShowInput(true);
  };
  const handleCancelUpload = () => {
    setUploadedFiles(null);
    setShowInput(true);
  };
  return (
    <>
      <div className="nikki">
        {showInput ? (
          <div>
            <Input
              style={{
                width: "1430px",
                bordercolor: "red",
                dispaly: "inlineBlock",
                borderstyle: "solid",
              }}
              fluid="true"
              name="message"
              value={message}
              onChange={handleChange}
              labelPosition="right"
              size="large"
            />
          </div>
        ) : (
          <div>
            <ImageUploader
              onSave={handleImagesave}
              onCancel={handleCancelUpload}
            />
          </div>
        )}

        <div className="text">
          <span className="send-icon">
            <Button icon="send" onClick={handleSendClick} /> Add Reply
          </span>
          <span className="upload-icon">
            <Button icon="upload" onClick={() => setShowInput(!showInput)} />
            Upload Media
          </span>
        </div>
      </div>
    </>
  );
};
export default MessageInput;
