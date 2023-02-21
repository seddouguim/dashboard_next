import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

import { Fade } from "@mui/material";

import { useState } from "react";
import { Stack } from "@mui/system";

import AccountBoxIcon from "@mui/icons-material/AccountBox";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <ArrowDown />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          style: {
            // width: "10rem",
            marginTop: "0.75rem",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <Stack
            direction="row"
            sx={{
              width: "100%",
            }}
            spacing={1}
          >
            <Typography>
              <AccountBoxIcon fontSize="small" />
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
                textTransform: "uppercase",
              }}
            >
              Profile
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem>
          <Stack
            direction="row"
            sx={{
              width: "100%",
            }}
            spacing={1}
          >
            <Typography>
              <LogoutIcon fontSize="small" />
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
                textTransform: "uppercase",
              }}
            >
              Log out
            </Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
