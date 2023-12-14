import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordChange.css";
import { Card, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
export default function PasswordChange() {
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [passwordcheck, setpasswordcheck] = useState();
  let navigate = useNavigate();
  var s = window.location.href;
  var token = s.substring(40);
  console.log(token);
  const check = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setpassword(value);
    } else {
      setconfirm_password(value);
    }
  };
  const handlepsww = (event) => {
    event.preventDefault();
    var params2 = new URLSearchParams();
    params2.append("password", password);
    params2.append("token", token);
    axios.post("http://localhost:8088/reset_password", params2).then((res) => {
      console.log(res.data);
      window.alert("Password has been updated successfully login again");
      navigate("/");
    });
  };
  useEffect(() => {
    if (password === confirm_password) {
      setpasswordcheck(true);
    } else {
      setpasswordcheck(false);
    }
  }, [password, confirm_password]);

  return (
    <div className="bo">
      <div
        className="container"
        style={{ marginTop: "200px", marginLeft: "280px" }}
      >
        <Card
          style={{
            width: "670px",
            height: "270px",
            marginRight: "240px",
          }}
        >
          <p style={{ marginLeft: "240px" }}>
            <strong style={{ fontSize: "25px" }}> Change Password </strong>
          </p>
          <form
            className="pswchn"
            style={{ marginLeft: "80px", marginTop: "40px" }}
          >
            <div className="border border-secondary rounded p-3">
              <div>
                <input type="hidden" name="token" value={token} />
                <p>
                  <TextField
                    type="password"
                    name="password"
                    className="form-control"
                    label="Enter your new password"
                    onChange={check}
                    required
                    style={{ width: "500px", height: "50px" }}
                  />
                </p>
                <p>
                  <TextField
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    label="Confirm your new password"
                    onChange={check}
                    style={{ width: "500px", height: "50px" }}
                    required
                  />
                </p>
                {password && confirm_password && (
                  <span id={passwordcheck ? "matching" : "notmatching"}>
                    {passwordcheck ? "matching" : "not matching"}
                  </span>
                )}
                <p className="text-center">
                  <button
                    type="submit"
                    value="Change Password"
                    className="btn btn-primary"
                    id="submit"
                    onClick={handlepsww}
                    style={{
                      marginLeft: "220px",
                      height: "30px",
                      width: "60px",
                      backgroundColor: "black",
                      color: "whitesmoke",
                      borderRadius: "6px",
                    }}
                  >
                    Change
                  </button>
                </p>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
