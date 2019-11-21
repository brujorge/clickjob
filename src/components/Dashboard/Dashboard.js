import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "@reach/router";

import Header from "components/Header";
import Results from "components/Results";

import DataContext from "components/Context/DataContext";

const DEFAULT_QUERY = "React+Rails";

const getData = async setData => {
  await axios
    .get(`https://www.getonbrd.com/search/jobs?q=${DEFAULT_QUERY}`)
    .then(response => {
      setData(response.data);
    });
};

const Dashboard = ({ handleLogout, user }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData(setData);
  }, []);

  if (!user) {
    return <Redirect to="/login" noThrow />;
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <DataContext.Provider value={{ setData: setData }}>
        <Header handleLogout={handleLogout} />
        <Results data={data} />
      </DataContext.Provider>
    </main>
  );
};

export default Dashboard;
