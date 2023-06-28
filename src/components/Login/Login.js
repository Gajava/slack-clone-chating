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
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../../store/actiontype";
import "./login.css";

const Login = () => {
  let user = {
    email: "",
    password: "",
  };
  let errors = [];
  const [userState, setUserState] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(errors);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userName);

  //const history = useHistory();
  const handleInput = (e) => {
    let target = e.target;
    setUserState((currentState) => {
      let currentUser = { ...currentState };
      currentUser[target.name] = target.value;
      return currentUser;
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
    }
    return true;
  };
  const isFormEmpty = () => {
    return !userState.password.length || !userState.email.length;
  };
  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userState.userName);
    console.log(userState.password);
    setErrorState(() => []);
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(userState.email, userState.password)
        .then((user) => {
          setIsLoading(false);
          console.log(user.user.photoURL.replace(/ +/g, ""));
          dispatch({
            type: SET_USER,
            payload: user.user.displayName,
          });
          dispatch({
            type: "PhotoURL",
            payload: user.user.photoURL.replace(/ +/g, ""),
          });
          setLoggedIn(true);
          setRedirect(true);
          console.log(user);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorState((prevState) =>
            prevState.concat({ message: error.message })
          );
        });
    }
  };
  console.log(users);

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <img
          className="image"
          src="data:image/png;base64,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"
          alt=""
        />
        <div className="login">
          <Header>
            <h1>Login</h1>
          </Header>
        </div>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
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
              placeholder=" user password"
            />
          </Segment>
          <div className="login-button">
            <Button>
              Submit
            </Button>
          </div>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
        {isLoggedIn && redirect && <Navigate to="/sidebar" />}
        <Message>
          Already an user ? <Link to="/register">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
export default Login;
