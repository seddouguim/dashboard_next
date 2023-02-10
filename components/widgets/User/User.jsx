import styles from "./User.module.css";

import { useState } from "react";

import Image from "next/image";
import avatar_image from "../../../public/images/avatar.png";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";

const User = () => {
  const [name, setName] = useState({
    first: "Mehdi",
    last: "Seddougui",
  });

  const [dropdown, setDropdown] = useState(false);

  const className = dropdown ? styles.dropdown : styles.hidden;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <Image src={avatar_image} alt="avatar" />
        </div>

        <div className={styles.name}>
          <h1>{name.first}</h1>
          <h2>{name.last}</h2>
        </div>

        <div className={styles.icon}>
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};

export default User;
