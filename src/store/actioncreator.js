
import { SET_USER } from "./actiontype";
import { SET_CHANNEL } from "./actiontype";
import { SET_Group_Id } from "./actiontype";
import{ SET_NAMES} from './actiontype'
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
export const setnames = (names) => {
  return {
    type: SET_NAMES,
    payload: {
      currentname: names,
    },
  };
}

export const privatechannel = (names) => {
  return {
    type: privatechannel,
    payload: {
      currentchannel: privatechannel,
    },
  };
};
export const setgroupId = (group) => {
  return {
    type: SET_Group_Id,
    payload: {
      currentgroup: group,
    },
  };
}
export const setChannel = (channel) => {
  return {
    type: SET_CHANNEL,
    payload: {
      currentchannel:channel
    
    }
  }
}
export const Images = (image) => {
  return {
    type: Images,
    payload: {
      currentimage:Image
    }
  }
}
export const AddChannel = (channel) => {
  return {
    type: 'addchannel',
    payload:channel
  }
}
export const privatechat = (chat) => {
  return {
    type: " privatechat",
    payload: chat
  }
}
export const setcount = (count) => {
  return {
    type: "SET_COUNT",
    payload:count
  }
}