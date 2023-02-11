import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import StatusBar from "../StatusBar/StatusBar";

import style from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div id="container">
        <div className="left">
          <Sidebar />
        </div>

        <main className={style.container}>{children}</main>

        {/* Right Sidebar */}
        <div className="right">
          <StatusBar />
        </div>
      </div>

      {/* Footer */}
    </>
  );
};

export default Layout;
