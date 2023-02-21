import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import StatusBar from "../StatusBar/StatusBar";

import style from "./Layout.module.css";

import { AppBar, Toolbar, Drawer, Box, Grid, Typography } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />

        <Grid
          container
          sx={{
            maxHeight: "calc(100vh - 3.5rem)",
            display: "grid",
            gridTemplateColumns: "16rem 1fr 20rem",
            gridAutoRows: "minmax(0, 1fr)",
          }}
        >
          <Grid item>
            <Sidebar />
          </Grid>
          <Grid item sx={{ overflow: "auto", padding: "0.5rem" }}>
            {children}
          </Grid>
          <Grid item>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                alignContent: "center",
              }}
              padding={1}
            >
              <StatusBar />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
    </>
  );
};

export default Layout;
