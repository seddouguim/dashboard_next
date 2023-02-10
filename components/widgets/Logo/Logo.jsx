import styles from "./Logo.module.css";

import WindPowerIcon from "@mui/icons-material/WindPower";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.img}>
        <WindPowerIcon />
      </div>
      <div className={styles.title}>
        <h1>Energy Solutions</h1>
      </div>
    </div>
  );
};

export default Logo;
