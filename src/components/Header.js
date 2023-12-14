import { React } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "bootstrap/dist/js/bootstrap";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Header({ setfilteredbooks,setsortfilter }) {
  const navigate = useNavigate();
  const [filter, setfilter] = useState("");
  const [search, setsearch] = useState("");
  const settings = ["Profile", "Reset Password", "Sign Out"];
  const [anchorElUser, setAnchorElUser] = useState("");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const addbook = () => {
    navigate("/mybooks");
  };
  const handleprofile = (event) => {
    if (event.target.id == "Sign Out") {
      navigate("/");
    } else if (event.target.id == "Reset Password") {
      navigate("/resetpsw");
    }
    else {
      navigate("/profile");
    }
    handleCloseUserMenu();
  };

  const handleselect = (event) => {
    setfilter(event.target.value);
  };

  const handlesearch = (event) => {
    event.preventDefault();
    var fd = new FormData();
    if (filter.length > 2) {
      fd.append("filter", filter);
      fd.append("search", search);
      axios.post("http://localhost:8088/search", fd).then((res) => {
        setfilteredbooks(res.data);
      });
    } else {
      window.alert("please choose a filter");
    }
  };

/*   useEffect(() => {
    var c = counti + count;
    setCount(c);
  },[counti]) */

  const handlesort = (event) => {
    event.preventDefault();
    
    setsortfilter(event.target.value);
  };
  const handlecart = () => {
    navigate("/mycart");
  }
  return (
    <div className="header" style={{ position: "static" }}>
      <strong
        style={{
          color: "#7267cb",
          marginLeft: "40px",
          fontSize: "28px",
        }}
      >
        BOOKAZON
      </strong>

      <div className="header__search" style={{ marginLeft: "90px" }}>
        <select
          onChange={handleselect}
          style={{
            height: "33px",
            backgroundColor: "#F5F5F5 ",
            width: "95px",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
          }}
        >
          <option value="none" hidden>
            Filter
          </option>
          <option style={{ width: "300px" }} value="name">
            Book Name
          </option>
          <option>Author</option>
          <option>Category</option>
        </select>
        <input
          className="header__searchInput"
          type="text"
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <a href="">
          <SearchIcon
            className="header__searchIcon"
            onClick={handlesearch}
            style={{
              marginTop: "5px",
              color: "black",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          />
        </a>
        <div className="header__filter" style={{ marginLeft: "90px" }}>
          <select
            onChange={handlesort}
            style={{
              height: "20px",
              backgroundColor: "#E1CDC9",
              width: "104px",
            }}
          >
            <option value="none" hidden>
              Sort By Price
            </option>
            <option value="ltoh">Low to High</option>
            <option value="htol">High to Low</option>
          </select>
        </div>
      </div>

      <div
        className="header__nav"
        style={{ marginLeft: "30px", marginRight: "120px" }}
      >
        <div className="header__option" style={{ marginRight: "40px" }}>
          <a
            href=""
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
            className="header__optionLineOne"
            onClick={addbook}
          >
            <b>My Books</b>
          </a>
        </div>

        <div className="header__option" style={{ marginRight: "40px" }}>
          <a
            href="http://localhost:3000/myorders"
            style={{ textDecoration: "none", color: "white" }}
            className="header__optionLineOne"
          >
            <b>My Orders</b>
          </a>
        </div>

        <div className="header__optionBasket">
          <a href="/mycart" onClick={handlecart}>
            <BsCart2
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
          </a>
          {/* <span className="header_optionLineTwo header_basketCount">{count}</span> */}
        </div>
      </div>
      <div className="header_profile">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip disableHoverListener>
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
  );
}

export default Header;
