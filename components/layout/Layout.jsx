import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div id="container">
        <div className="left">
          <Sidebar />
        </div>

        <main>{children}</main>

        {/* Right Sidebar */}
        <div className="right"></div>
      </div>

      {/* Footer */}
    </>
  );
};

export default Layout;
