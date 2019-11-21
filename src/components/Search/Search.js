import React, { useState, useContext } from "react";
import axios from "axios";

import DataContext from "components/Context/DataContext";

import styles from "./styles.module.scss";

import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

const Search = () => {
  const [query, setQuery] = useState("");
  const { setData } = useContext(DataContext);

  const handleSearch = async () => {
    const queryString = query.split(" ").join("+");
    axios
      .get(`https://www.getonbrd.com/search/jobs?q=${queryString}`)
      .then(response => setData(response.data));
  };
  return (
    <div className={styles.search}>
      <SearchIcon />
      <input
        type="text"
        value={query}
        placeholder="React, Node.js, Ruby on Rails remote"
        onChange={e => setQuery(e.target.value)}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
