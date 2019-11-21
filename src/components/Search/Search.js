import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

import ResultsContext from "components/Context/ResultsContext";

import styles from "./styles.module.scss";

import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

const Search = () => {
  const { setResults } = useContext(ResultsContext);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = async e => {
    setLoading(true);
    e.preventDefault();
    const queryString = query.split(" ").join("+");
    axios
      .get(`https://www.getonbrd.com/search/jobs?q=${queryString}`)
      .then(response => {
        setLoading(false);
        setResults(response.data);
        navigate("/");
      });
  };
  return (
    <form className={styles.search} onSubmit={handleSearch}>
      <SearchIcon />
      <input
        type="text"
        value={query}
        placeholder="React, Node.js, Ruby on Rails remote"
        onChange={e => setQuery(e.target.value)}
      />
      <button disabled={loading} type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default Search;
