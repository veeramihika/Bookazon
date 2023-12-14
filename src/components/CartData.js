import React, { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import LoadImage from "./LoadImage";
import "./Header.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Modal from "@mui/material/Modal";
import { CloseButton } from "react-bootstrap";
import { Close } from "@mui/icons-material";
import { padding } from "@mui/system";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CartData(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const [books, setBooks] = useState([]);
  var mobile_number = localStorage.getItem("number");
  const [delivery_address, setdelivery_address] = useState("");
  useEffect(() => {
    var fd = new FormData();
    fd.append("seller", localStorage.getItem("number"));

    axios
      .post("http://localhost:8088/viewcart", fd)
      .then((res) => setBooks(res.data));
  }, []);
  const navigate = useNavigate();
  const handleRemove = (event) => {
    let id = event.target.id;
    var fd = new FormData();
    fd.append("seller", localStorage.getItem("number"));
    console.log(id);
    if (window.confirm("are you sure to remove item from cart?")) {
      axios.post(`http://localhost:8088/delcart/${id}`, fd).then((res) => {
        setBooks(res.data);
      });
    }
  };
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
  const settings = ["Profile", "Reset Password", "Sign Out"];
  const [anchorElUser, setAnchorElUser] = useState("");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const goshop = () => {
    navigate("/home");
  };
  const goto = async () => {
    if (document.getElementById("terms").checked) {
      
    
      if (document.getElementById("delivery").value.length > 8) {
        var fdd = new FormData();
        debugger;
        fdd.append("mobile_number", mobile_number);
        console.log(...fdd);
        await axios
          .post("http://localhost:8088/getproductids", fdd)
          .then((res) => {
            var fgg = new FormData();
            fgg.append("products", res.data);
            fgg.append("delivery_address", delivery_address);
            fgg.append("order_amount", total_price);
            fgg.append("customer_contact", localStorage.getItem("number"));
            axios.post("http://localhost:8088/placeorder", fgg);
            navigate("/home");
          });
      } else {
        window.alert("please enter your delivery address");
      }
    }
    else {
      window.alert("please accept terms and conditions to proceed further")
    }
  }

  var total_price = 0;
  return (
    <div>
      <div className="header">
        <strong
          style={{
            color: "#7267cb",
            marginLeft: "40px",
            fontSize: "26px",
            cursor: "pointer",
          }}
          onClick={goshop}
        >
          BOOKAZON
        </strong>

        <div className="header__nav">
          <div
            className="header__option"
            style={{
              marginRight: "27px",
              marginLeft: "80px",
            }}
          >
            <a
              href="http://localhost:3000/mybooks"
              style={{ textDecoration: "none", color: "white" }}
              className="header__optionLineOne"
            >
              <b>My Books</b>
            </a>
          </div>

          <div
            className="header__option"
            style={{ marginRight: "30px", marginLeft: "10px" }}
          >
            <a
              href="http://localhost:3000/myorders"
              style={{ textDecoration: "none", color: "white" }}
              className="header__optionLineOne"
            >
              <b>My Orders</b>
            </a>
          </div>

          <div className="header_profile" style={{ marginLeft: "1000px" }}>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Profile" disableHoverListener>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "30px",
                      padding: "0px",
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
      <div
        className="container"
        style={{
          backgroundColor: "white",
          marginTop: "50px",
          objectFit: "cover",
          position: "absolute",
        }}
      >
        <Grid
          sx={{ flexGrow: 1 }}
          container
          spacing={2}
          style={{ marginLeft: "25px" }}
        >
          <Grid item xs={15}>
            <Grid container justifyContent="center" spacing={5}>
              {books.map((book) => (
                <Grid key={book.product_id} item>
                  <Card
                    sx={{
                      height: 500,
                      width: 1400,
                      border: "1px solid",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    <td>
                      <div
                        style={{
                          marginLeft: "200px",
                          marginTop: "50px",
                          position: "absolute",
                        }}
                      >
                        <LoadImage
                          id={book.product_id}
                          w={"350px"}
                          h={"350px"}
                        ></LoadImage>
                      </div>
                    </td>

                    <br />
                    <div style={{ marginLeft: "1000px", marginTop: "50px" }}>
                      <td style={{}}>
                        <strong>Name: </strong> {book.product_name}
                      </td>
                      <br />
                      <td
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        <strong {...(total_price = total_price + book.price)}>
                          Price:{" "}
                        </strong>{" "}
                        Rs.{book.price}
                      </td>

                      <br />
                      <td
                        style={{
                          marginTop: "15px",
                        }}
                      >
                        <strong>Category: </strong> {book.category}
                      </td>
                      <br />

                      <td
                        style={{
                          marginTop: "15px",
                        }}
                      >
                        <strong>Seller: </strong>
                        {book.nameofseller}
                      </td>
                      <br />

                      <td
                        style={{
                          marginTop: "15px",
                        }}
                      >
                        <strong>Mobile: </strong>
                        {book.mobileno}
                      </td>
                      <br />
                      <td
                        style={{
                          marginTop: "15px",
                        }}
                      >
                        <button
                          id={book.product_id}
                          onClick={handleRemove}
                          style={{ marginTop: "10px", cursor: "pointer" }}
                        >
                          Remove from Cart
                        </button>
                      </td>
                    </div>
                  </Card>
                  <br />
                </Grid>
              ))}
            </Grid>
            {total_price == 0 && (
              <div>
                <p style={{ marginLeft: "625px", marginTop: "200px" }}>
                  <strong>Looks like the cart is empty</strong>
                </p>
                <Button
                  style={{ marginLeft: "645px", backgroundColor: "none" }}
                  onClick={goshop}
                >
                  {" "}
                  Go Add Something
                </Button>
              </div>
            )}
            {total_price > 0 && (
              <div>
                <p
                  style={{
                    marginLeft: "625px",
                    fontSize: "20px",
                    color: "brown",
                  }}
                >
                  {" "}
                  Subtotal ({books.length}{books.length>1?" items":" item"}): <strong> ₹{total_price} </strong>
                </p>
                <TextField
                  label="Delivery address"
                  id="delivery"
                  type="text"
                  style={{ marginLeft: "580px", marginBottom: "20px" }}
                  required
                  onChange={(e) => {
                    setdelivery_address(e.target.value);
                  }}
                ></TextField>
                <br />
                <Checkbox style={{ marginLeft: "580px" }} required id="terms"></Checkbox >
                <p
                  style={{
                    marginLeft: "620px",
                    position: "relative",
                    marginTop: "-33px",
                  }}
                >
                  <strong>
                    I agree to the{" "}
                    <a
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={handleOpen}
                    >
                      <u> terms & conditions</u>
                    </a>
                  </strong>
                </p>

                <br />
                <button
                  style={{
                    marginLeft: "600px",
                    backgroundColor: " #FFD814",
                    borderColor:"#FCD200",
                    height: "40px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    fontSize: "17px",
                  }}
                  onClick={goto}
                >
                  Confirm order
                </button>
              </div>
            )}
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ padding: "17px",paddingTop:"10px" }}>
            <Close style={{ marginLeft: "393px", cursor: "pointer", marginTop: "-70px" }} onClick={ handleClose}/>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Terms And Conditions
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              1. The Order cannot be cancelled after it has been dispatched.
              <br />
              <br />
              2. The Delivery address cannot be changed once the order has been
              dispatched
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default CartData;
