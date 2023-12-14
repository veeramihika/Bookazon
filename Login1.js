import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, TextField, Box, CardContent, CardHeader } from "@mui/material";

import axios from "axios";
import "./LandingPage.css";

export default function Login1() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setmsg] = useState("");
  const [error, seterror] = useState(false);

  const handleLogin = (event) => {
    console.log(email, password);
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    async function verify(params) {
      await axios
        .post("http://localhost:8088/verification", params)
        .then((res) => {
          setmsg(res.data.substring(0, 4));
          localStorage.setItem("number", res.data.substring(4));
        })
        .catch((err) => console.log(err));
    }
    verify(params);
  };
  React.useEffect(() => {
    if (msg == "fail") {
      console.log(msg);
      document.getElementById("message").style.visibility = "visible";
    }
    if (msg == "pass") {
      console.log(msg);
      navigate("/home");
    }
  }, [msg]);
  const handleCreateAccount = () => {
    navigate("/SignUp");
  };
  return (
    <CardContent component="form">
      <CardHeader title="Login" style={{ color: "#7267CB", fontSize: 18 }} />
      <Box>
        <AccountCircleIcon style={{ fontSize: 150 }} />
      </Box>

      <TextField
        error={error}
        className="field"
        type="text"
        label="Username"
        name="email"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
        Icon={<AccountCircleIcon />}
        margin="dense"
        required
      />

      <TextField
        className="field"
        type="password"
        label="password"
        name="password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        margin="dense"
        required
      />

      <a href="/resetpsw">Forgotten password?</a>

      <h3 id="message" style={{ visibility: "hidden", color: "RED" }}>
        Username or Password is incorrect!!
      </h3>

      <Button onClick={handleLogin} color="primary" variant="contained">
        Login
      </Button>

      <p>Don't have an account?</p>

      <Button variant="contained" color="primary" onClick={handleCreateAccount}>
        create account
      </Button>
    </CardContent>
  );
}
