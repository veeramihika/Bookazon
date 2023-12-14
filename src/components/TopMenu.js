import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Face";
import { Button, MenuItem } from "@mui/material";
import { Icon } from "@mui/material/";
import { green } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
/* import SellButtonPlus from "./SellButtonPlus"; */
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const useStyles = styled((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopMenu() {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/Create");
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <MenuItem>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="h6" className={classes.title}>
            About
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleAdd}>
          <Typography variant="h6" className={classes.title}>
            Add
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="h6" className={classes.title}>
            Bookazon
          </Typography>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}
