import React from "react";
import { Link } from "@reach/router";

import Logo from "assets/images/logo.png";

import Search from "components/Search";

import styles from "./styles.module.scss";

const Header = ({ handleLogout, user }) => {
  if (!user) {
    return null;
  }
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <Search />
        <nav>
          <Link to="/favourites">Favourites</Link>
          <p className={styles.logout} onClick={handleLogout}>
            Logout
          </p>
        </nav>
      </div>
    </header>
  );
};

export default Header;
