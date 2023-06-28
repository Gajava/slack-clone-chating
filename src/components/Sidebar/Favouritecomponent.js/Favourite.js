
import React,{useState} from 'react'
import {Menu,Icon} from 'semantic-ui-react'
const Favourite = () => {
  return (
    <Menu.Menu>
      <Menu.Item style={{ fontsize: "17px" }}>
        <span style={{ color: "white" ,marginRight:200,fontSize:"large"}}>
          <Icon name="star" /> starred (0)
        </span>
      </Menu.Item>
    </Menu.Menu>
  );
}

export default Favourite
