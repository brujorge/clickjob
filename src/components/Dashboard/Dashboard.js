import React, { useContext } from "react";
import { Redirect } from "@reach/router";

import ResultsContext from "components/Context/ResultsContext";
import Results from "components/Results";
import Loading from "components/Loading";

const Dashboard = ({ user }) => {
  const { results, setResults } = useContext(ResultsContext);
  if (!user) {
    return <Redirect to="/login" noThrow />;
  }
  if (!results) {
    return <Loading />;
  }

  return (
    <main>
      <ResultsContext.Provider value={{ setResults: setResults }}>
        <Results results={results} user={user} />
      </ResultsContext.Provider>
    </main>
  );
};

export default Dashboard;
