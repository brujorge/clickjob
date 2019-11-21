import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import axios from "axios";

import Header from "components/Header";
import Dashboard from "./components/Dashboard";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import UserContext from "./components/Context/UserContext";
import ResultsContext from "./components/Context/ResultsContext";

const INITIAL_QUERY = "React+Rails";

const getInitialResults = async setResults => {
  await axios
    .get(`https://www.getonbrd.com/search/jobs?q=${INITIAL_QUERY}`)
    .then(response => {
      setResults(response.data);
    });
};

const App = () => {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    getInitialResults(setResults);
  }, []);

  const handleLogout = () => {
    axios
      .delete("https://clickjob-api.herokuapp.com/logout", {
        withCredentials: true
      })
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
      .get("https://clickjob-api.herokuapp.com/logged_in", {
        withCredentials: true
      })
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
      <ResultsContext.Provider
        value={{ results: results, setResults: setResults }}
      >
        <Header handleLogout={handleLogout} user={user} />
        <Router>
          <Dashboard user={user} path="/" />
          <Favourites path="/favourites" />
          <Login handleSuccessfulAuth={handleSuccessfulAuth} path="/login" />
          <SignUp handleSuccessfulAuth={handleSuccessfulAuth} path="/signup" />
        </Router>
      </ResultsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
