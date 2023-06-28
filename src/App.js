import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import firebase from "./server/firebase";
import Reg from "./components/Register/Reg";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Messages from "./components/Messages/Messages";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <Router>
      <Routes>
        {currentUser ? (
          <>
            <Route path="/sidebar" element={<Sidebar />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/message" element={<Messages/>}/>
      </Routes>
    </Router>
  );
};
export default App;
