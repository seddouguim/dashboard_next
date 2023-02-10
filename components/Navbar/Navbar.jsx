import React from "react";

import styles from "./Navbar.module.css";

// Components
import Logo from "../widgets/Logo/Logo";
import User from "../widgets/User/User";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      {/* <User /> */}
    </nav>
  );
};

export default Navbar;
