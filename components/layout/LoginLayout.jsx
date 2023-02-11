import style from "./Layout.module.css";

import Navbar from "../Navbar/Navbar";

const LoginLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default LoginLayout;
