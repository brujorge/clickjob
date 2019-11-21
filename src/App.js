import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import axios from "axios";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import UserContext from "./components/Context/UserContext";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch(error => {
        console.log("Logout error", error);
      });
  };
  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && !user) {
          setUser(response.data.user);
        } else if (!response.data.logged_in && user) {
          setUser(null);
        }
      });
  };
  const handleSuccessfulAuth = user => {
    setUser(user);
    navigate("/");
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Dashboard handleLogout={handleLogout} user={user} path="/" />
        <Login handleSuccessfulAuth={handleSuccessfulAuth} path="/login" />
        <SignUp handleSuccessfulAuth={handleSuccessfulAuth} path="/signup" />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
