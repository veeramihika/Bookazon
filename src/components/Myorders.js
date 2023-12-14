import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import LoadImage from "./LoadImage";
import { useNavigate } from "react-router-dom";
function MyOrders(props) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    var fd = new FormData();
    fd.append("customer_contact", localStorage.getItem("number"));
      axios.post("http://localhost:8088/myorders", fd).then((res) => {
         setBooks(res.data); 
      })
      
  }, []);

  const handleCancel = (event) => {
    if (window.confirm("Your order will be cancelled on clicking ok")) {
      var fr = new FormData();
      fr.append("mobile_number", localStorage.getItem("number"));
      fr.append("id", event.target.id);
        axios.post("http://localhost:8088/cancelorder", fr).then((res) => {
            setBooks(res.data);
      })
      navigate("/home");
    }
  };
    const handleprofile = (event) => {
        console.log(event.target.id);
    if (event.target.id == "Signout") {
      navigate("/");
    } else if (event.target.id == "Reset Password") {
      navigate("/resetpsw");
    } else {
      navigate("/profile");
    }
    handleCloseUserMenu();
  };

  const settings = ["Profile", "Reset Password", "Signout"];
  const [anchorElUser, setAnchorElUser] = useState("");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlehome = () => {
    navigate("/home");
  };
  return (
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

        <div className="header__option" style={{ marginLeft: "60px" }}>
          <a
            href=""
            style={{ textDecoration: "none", color: "white" }}
            className="header__optionLineOne"
          >
            <b></b>
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
                    marginLeft: "1230px",
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

      <div
        className="container"
        style={{
          backgroundColor: "white",
          marginTop: "50px",
          objectFit: "cover",
          position: "absolute",
          marginLeft: "80px",
        }}
      >
        <Table sx={{ minWidth: 850 }} size="medium" aria-label="a dense table">
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.product_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell width={"250px"}>
                  <LoadImage
                    id={book.product_id}
                    h={"200px"}
                    w={"200px"}
                  ></LoadImage>
                </TableCell>
                <TableCell width={"150px"} component="th" scope="row">
                  <strong style={{ fontSize: "20px" }}>
                    {book.product_name}
                  </strong>
                </TableCell>
                <TableCell width={"250px"} align="right">
                  <strong style={{ fontSize: "20px" }}>Rs.{book.price}</strong>
                </TableCell>
                <TableCell width={"250px"} align="right">
                  <strong style={{ fontSize: "20px" }}>
                    Sold by {book.nameofseller}
                  </strong>
                </TableCell>
                {/* <TableCell align="right">{book.customere_contact}</TableCell>
                <TableCell align="right">{book.deliveryaddress}</TableCell> */}
                <TableCell width={"250px"} align="right">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "whitesmoke", color: "black" }}
                    id={book.product_id}
                    onClick={handleCancel}
                  >
                    Cancel Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MyOrders;
