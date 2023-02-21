import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import StatusBar from "../StatusBar/StatusBar";

import style from "./Layout.module.css";

import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";

import WindPowerIcon from "@mui/icons-material/WindPower";

import ArrowDown from "@mui/icons-material/KeyboardArrowDown";

import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

const Layout = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              ENERGY SOLUTIONS
            </Typography>
            <Stack
              padding={0.5}
              direction="row"
              spacing={1}
              sx={{ cursor: "pointer", "&:hover": { backgroundColor: "grey" } }}
            >
              <Avatar>MS</Avatar>
              <Stack direction="column">
                <Typography variant="body1" component="div">
                  El Mehdi
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color={"text.secondary"}
                  fontWeight={500}
                >
                  Seddougui
                </Typography>
              </Stack>
              <Typography variant="body1" component="div">
                <ArrowDown />
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
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
    </Box>
  );
};

export default Layout;
