import React from "react";

import styles from "./Navbar.module.css";

import { useSelector } from "react-redux";

// Components
import Logo from "../widgets/Logo/Logo";
import AvatarBox from "../widgets/AvatarBox/AvatarBox";

const Navbar = () => {
  const { username } = useSelector((state) => state.user);

  return (
    <nav className={styles.nav}>
      <Logo />
      {username && <AvatarBox />}
    </nav>
  );
};

export default Navbar;
