import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Card, Grid } from "@mui/material";
import LoadImage from "./LoadImage";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import "./Header.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { height } from "@mui/system";

export default function () {
  const settings = ["Profile", "Reset Password", "Sign Out"];
  const [anchorElUser, setAnchorElUser] = useState("");
  const handleprofile = (event) => {
    if (event.target.id == "Sign Out") {
      navigate("/");
    }
     else if (event.target.id == "Reset Password") {
      navigate("/resetpsw");
    }
    else {
      navigate("/profile");
    }
    
    handleCloseUserMenu();
  };
  const handleremove = (event) => {
    var id = event.target.id;
    if (window.confirm("are you sure?")) {
      console.log(id);
      var fd = new FormData();
      fd.append("sellerno", localStorage.getItem("number"));
      axios.post(`http://localhost:8088/deleterr/${id}`,fd).then((res) => {
        setmybooks(res.data);
      })
    }
    
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const [mybooks, setmybooks] = useState([]);
  const handleder = () => {
    navigate("/create");
  };
  useEffect(() => {
    var fd = new FormData();
    fd.append("sellerno", localStorage.getItem("number"));
    axios.post("http://localhost:8088/mybooks", fd).then((res) => {
      setmybooks(res.data);
    });
  }, []);
  const handlehome=() => {
    navigate("/home");
  }
  return (
    <div>
      <div>
        <div className="header">
          <a
            href=""
            style={{ textDecoration: "none", color: "white" }}
            onClick={handlehome}
          >
            <strong
              style={{ color: "#7267cb", marginLeft: "40px", fontSize: "28px" }}
            >
              BOOKAZON
            </strong>
          </a>

          <div
            className="header__option"
            style={{ marginRight: "40px", marginLeft: "60px" }}
          >
            <a
              href="http://localhost:3000/myorders"
              style={{ textDecoration: "none", color: "white" }}
              className="header__optionLineOne"
            >
              <b>My Orders</b>
            </a>
          </div>
          <div className="header__option" style={{ marginRight: "40px" }}>
            <a
              href=""
              style={{ textDecoration: "none", color: "white" }}
              className="header__optionLineOne"
              onClick={handleder}
            >
              <b>Add Book</b>
            </a>
          </div>

          <div className="header_profile">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="" disableHoverListener>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "30px",
                      padding: "0px",
                      marginLeft: "1000px",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} id={setting} onClick={handleprofile}>
                    <Typography
                      textAlign="center"
                      id={setting}
                      onClick={handleprofile}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </div>
      </div>
      <div>
        <div
          className="container"
          style={{
            backgroundColor: "white",
            marginTop: "50px",
            objectFit: "cover",
            position: "absolute",
          }}
        >
          {/*       <div>
        {books.map((book) => (
          <Card
            style={{
              backgroundColor: "whitesmoke",
              width: "500px",
              padding: "10px",
              margin: "10px",
            }}
          >
            <div key={book.product_id}>
              <td>
                <strong>name:</strong> {book.product_name}
              </td>
              <br />
              <td>
                <strong>price:</strong> {book.price} rs
              </td>
              <br />

              <td>
                <strong>seller:</strong>
                {book.nameofseller}
              </td>
              <br />
              <td>
                <LoadImage id={book.product_id}></LoadImage>
              </td>
              <br />
            </div>
          </Card>
        ))} 
    
            </div>*/}
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={5}>
                {mybooks.map((book) => (
                  <Grid key={book.product_id} item>
                    <Card
                      sx={{
                        height: 450,
                        width: 250,
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                      }}
                    >
                      <td>
                        <LoadImage
                          id={book.product_id}
                          h={"250px"}
                          w={"250px"}
                        ></LoadImage>
                      </td>
                      <br />
                      <td>
                        <strong>Name:</strong> {book.product_name}
                      </td>
                      <br />
                      <td>
                        <strong>Author:</strong> {book.author}
                      </td>
                      <br />
                      <td>
                        <strong>Price:</strong>Rs.{book.price}
                      </td>
                      <br />
                      <td>
                        <button
                          style={{
                            backgroundColor: "gray",
                            color: "white",
                            marginLeft: "65px",
                            padding: "0px",
                            width: "80px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                          id={book.product_id}
                          onClick={handleremove}
                        >
                          Delete
                        </button>
                      </td>
                      <br />
                      <td>
                        <strong>Seller:</strong>
                        {book.nameofseller}
                      </td>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
