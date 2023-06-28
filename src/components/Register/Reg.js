import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from "semantic-ui-react";
import firebase from "../../server/firebase";
import "./Registeration.css";

import { Link } from "react-router-dom";
function Reg() {
  let user = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  let errors = [];
  let userCollectionRef = firebase.database().ref("users");
  const [userState, setUserState] = useState(user);
  const [errorstate, setErrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);
  const [issuccess, setIsSuccess] = useState(false);
  const handleInput = (e) => {
    let target = e.target;
    setUserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };
  const checkForm = () => {
    if (isFormEmpty()) {
      setErrorState((error) =>
        error.concat({
          message: "please fill all the forms",
        })
      );
      return false;
    } else if (!checkPassword()) {
      return false;
    }
    return true;
  };
  const isFormEmpty = () => {
    return (
      !userState.username.length ||
      !userState.password.length ||
      !userState.confirmpassword.length ||
      !userState.email.length
    );
  };
  const checkPassword = () => {
    if (userState.password.length < 6) {
      setErrorState((error) =>
        error.concat({
          message: "password must be greater than 8",
        })
      );
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      setErrorState((error) =>
        error.concat({
          message: "password and confirm password must be same",
        })
      );
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    setErrorState(() => []);
    setIsSuccess(true);
    if (checkForm()) {
      setIsLoading(false);
      console.log(userState);
      console.log("lalitha");
      firebase
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then((createUser) => {
          console.log(createUser);
          setIsLoading(false);
          updateuserDetails(createUser);
        })
        .catch((serverError) => {
          console.log(errors);
          setIsLoading(false);
          setErrorState((error) => error.concat(serverError));
        });
    }
  };
  const updateuserDetails = (createUser) => {
    if (createUser) {
      setIsLoading(true);
      createUser.user
        .updateProfile({
          displayName: userState.username,
          photoURL: `http://gravatar.com/avatar/${createUser.user.uid} ? d = identicon`,
        })
        .then(() => {
          setIsLoading(false);
          saveUserInDB(createUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          setErrorState((error) => error.contact(serverError));
        });
    }
  };
  const saveUserInDB = (createdUser) => {
    setIsLoading(true);
    userCollectionRef
      .child(createdUser.user.uid)
      .set({
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((serverError) => {
        setIsLoading(false);
        setErrorState((error) => error.contact(serverError));
      });
  };
  const formaterrors = () => {
    return errorstate.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <img
          className="image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnVAWszUqWvtDwqct2V4jK4LJK8AqtVQuYnkTY0E-HWg&usqp=CAU&ec=48600112"
          alt=""
        />
        <div className="register">
          <Header>
            <h1> Register</h1>
          </Header>
        </div>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              type="text"
              placeholder="userName"
              name="username"
              value={userState.username}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
            />
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="password"
            />
            <Form.Input
              name="confirmpassword"
              value={userState.confirmpassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="confirmpassword"
            />
          </Segment>
          <div className="register-button">
            <Button>Register</Button>
          </div>
        </Form>
        {errorstate.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
        <Message>
          Already an user ? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Reg;
