import React,{useState,useEffect} from 'react'
import firebase from '../../../server/firebase'
const Groupchannel = () => {
  const [messages, setMesssages] = useState([]);
  return (
    <ul>
      {Object.values(messages).map((message, index) => (
        <li key={index}>{message.content}</li>
      ))}
    </ul>
  );
}
export default Groupchannel;

