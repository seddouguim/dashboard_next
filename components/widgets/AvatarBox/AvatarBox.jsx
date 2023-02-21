import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import ArrowDown from "@mui/icons-material/KeyboardArrowDown";

import styled from "@emotion/styled";

import { useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";

const StyledPaper = styled(Paper)`
  border-radius: 0.5rem;
  background-color: transparent;
  // &:hover {
  //   background-color: rgba(255, 255, 255, 0.1);
  // }

  .MuiAvatar-root {
    width: 3rem;
    height: 3rem;
  }

  padding: 0.25rem;

  cursor: pointer;
`;

import AccountMenu from "../AccountMenu/AccountMenu";

const AvatarBox = () => {
  const { firstName, lastName } = useSelector((state) => state.user);
  const initials = firstName && (firstName[0] + lastName[0]).toUpperCase();

  return (
    <>
      <StyledPaper elevation={0}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar>{initials}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="white">
              {firstName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lastName}
            </Typography>
          </Grid>
          <Grid item>
            <AccountMenu />
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  );
};

export default AvatarBox;
