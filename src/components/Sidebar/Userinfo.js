import React, { useState } from "react";
import { Grid, Header, Icon, Image, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import firebase from "../../server/firebase";
import "./Userinfo.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const users = useSelector((state) => state);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAvatarDropdownopen, setIsAvatarDropdownopen] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    // For example, dispatch an action to clear user data from Redux store
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT" });
        navigate("/login");
      })
      .catch((error) => {
        console.log("Signout error", error);
      });
  };
  return (
    <Grid>
      <Grid.Column>
        <Grid.Row className="userinfo">
          <Header inverted as="h2">
            <Icon name="slack" />
            <div style={{ marginRight: 250 }}>
              <span> CrioBuzz</span>
            </div>
          </Header>
          <Header className="userinfo-header" inverted as="h4">
            <Image src={users.PhotoURL} avatar className="avatar" />
            <div style={{ marginRight: 300 }}>
              <Dropdown
                open={dropdownOpen}
                onOpen={handleDropdownOpen}
                onClose={handleDropdownOpen}
                trigger={<span>{users.userName}</span>}
                pointing="top right"
              >
                <Dropdown.Menu>
                  <Dropdown.Item>
                    Change Avatar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserInfo;
