import React from "react";

import styles from "./Navbar.module.css";

import WindPowerIcon from "@mui/icons-material/WindPower";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.img}>
          <WindPowerIcon />
        </div>
        <div className={styles.title}>
          <h1>Energy Solutions</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
