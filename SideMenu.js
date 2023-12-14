import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

const drawerWidth = 240;

const useStyles = styled((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `linear-gradient(#cfd9df,#e2ebf0)`,
    color: "grey",
  },
  bigAvatar: {
    margin: 100,
    width: 100,
    height: 100,
  },
}));

export default function SideMenu() {
  const classes = useStyles();
  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/");
  };
  return (
    <Drawer
      open={true}
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Grid container justify="center" alignItems="center">
        <Avatar
          src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
          className={classes.bigAvatar}
        />
      </Grid>

      <List>
        <ListItem button>
          <AccountCircle />
          Profile
          <ListItemText />
        </ListItem>
        <ListItem button onClick={handlelogout}>
          <ExitToApp />
          Sign Out
          <ListItemText />
        </ListItem>
      </List>
    </Drawer>
  );
}
