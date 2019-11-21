import React from "react";

import Logo from "assets/images/logo.png";

import Search from "components/Search";

import styles from "./styles.module.scss";

const Header = ({ handleLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src={Logo} alt="logo" />
        <Search />
      </div>
      <p className={styles.logout} onClick={handleLogout}>
        Logout
      </p>
    </header>
  );
};

export default Header;
