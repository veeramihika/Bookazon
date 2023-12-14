import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Grid } from "@mui/material";
import LoadImage from "./LoadImage";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
export default function View() {
  const navigate = useNavigate();
  const [books, setbooks] = useState([]);
  async function getter(id) {
    await axios.get(`http://localhost:8088/view/${id}`).then((res) => {
      setbooks(res.data);
    });
  }
  const handlehome = () => {
    navigate("/home");
  };
  const settings = ["Profile", "Reset Password", "Sign Out"];
  const [anchorElUser, setAnchorElUser] = useState("");
  const handleprofile = (event) => {
    if (event.target.id == "Sign Out") {
      navigate("/");
    } else if (event.target.id == "Reset Password") {
      navigate("/resetpsw");
    } else {
      navigate("/profile");
    }

    handleCloseUserMenu();
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleder = () => {
    navigate("/create");
  };
  const addtocart = (event) => {
    var fd = new FormData();
    fd.append("product_id", event.target.id);
    fd.append("mobile_no", localStorage.getItem("number"));
    axios.post("http://localhost:8088/addcart", fd);
    navigate("/home")
  };
  useEffect(() => {
    let id = parseInt(window.location.href.substring(27));
    getter(id);
  }, []);

  return (
    <div>
      <div>
        <div className="header" style={{ position: "absolute" }}>
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
                      marginLeft: "1307px",
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
      <Grid
        sx={{ flexGrow: 1 }}
        container
        spacing={2}
        style={{ marginTop: "100px" }}
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={5}>
            {books.map((book) => (
              <Grid key={book.product_id} item>
                <Card
                  sx={{
                    height: 500,
                    width: 850,
                    textAlign: "center",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <td
                    style={{
                      marginLeft: "30px",
                      marginTop: "20px",
                      position: "absolute",
                    }}
                  >
                    <LoadImage
                      id={book.product_id}
                      h={"350px"}
                      w={"350px"}
                      style={{ marginLeft: "30px" }}
                    ></LoadImage>
                  </td>
                  <br />
                  <div
                    style={{
                      marginLeft: "500px",
                      top: "180px",
                      position: "absolute",
                    }}
                  >
                    <td>
                      <strong>Name: </strong> {book.product_name}
                    </td>
                    <br />
                    <td>
                      <strong>Author: </strong> {book.author}
                    </td>
                    <br />
                    <td>
                      <strong>Price: </strong>Rs.{book.price}
                    </td>
                    <br />

                    <td>
                      <strong>Sold by: </strong>
                      {book.nameofseller}
                    </td>
                    <br />
                    <td>
                      <strong>Category: </strong>
                      {book.category}
                    </td>
                    <br />
                    <td>
                      <strong>Description:</strong>
                      {book.description}
                    </td>
                  </div>
                  <td>
                    <button
                      style={{
                        marginLeft: "300px",
                        marginTop: "390px",
                        position: "absolute",
                        cursor: "pointer",backgroundColor:"#FFD814",borderColor:"#FCD200" 
                      }}
                      id={book.product_id}
                      onClick={addtocart}
                    >
                      Add to cart
                    </button>
                  </td>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
