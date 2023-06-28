import { legacy_createStore as createStore } from "redux";
import { SET_USER } from "./actiontype";
let defaultUserState = {
  userName: "",
  PhotoURL: "",
  Messages: [],
  channels: [],
  channel: "",
  Images: "",
  count: "",
  GroupId: "",
  names: "",
  search:"",
};
const UserReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userName: action.payload, channel: "" };
    case "SET_NAMES":
      return { ...state, names: action.payload };;
    case "PhotoURL":
      return { ...state, PhotoURL: action.payload };
    case "SET_CHANNEL":
      return { ...state, channel: action.payload, userName: "" };
    case "Messages":
      return { ...state, Messages: action.payload };
    case "Update_Messages":
      return { ...state, Messages: [...state.Messages, action.payload] };
    case "Images":
      return { ...state, images: action.payload };
    case "addchannel":
      return { ...state, channels: [...state.channels, { ...action.payload }] };
    case "privatechat":
      return {
        ...state,
        chat: action.payload,
      };
    case "privatechannel":
      return {
        ...state,
        channel: action.payload,
      };
    case "SET_COUNT":
      return {
        ...state,
        count: action.payload,
      };
    case "SET_Group_Id":
      return {
        ...state,
        GroupId: action.payload,
      };

    default:
      return state;
  }
};
export const store = createStore(UserReducer);
