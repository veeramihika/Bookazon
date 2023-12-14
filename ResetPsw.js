import React, { useState } from "react";
import "./ResetPsw.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid } from "@mui/material";
export default function ResetPsw() {
  const [email, setemail] = useState();
  let navigate = useNavigate();
  const handlereset = (event) => {
    event.preventDefault();
    var params = new URLSearchParams();
    params.append("email", email);
    axios.post("http://localhost:8088/forgot_password", params).then((res) => {
      console.log(res.data);
      window.alert(
        "Reset link has been sent to your mail reset your password and login again"
      );
      navigate("/");
    });
  };
  return (
    <div className="bo">
      <Card
        style={{
                  marginLeft: "530px",
            
          width: "500px",
          alignSelf: "center",
          marginTop: "250px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "black", fontStyle: "initial",marginLeft:"90px" }}>
            Forgot Password
          </h2>
        </div>
        <form method="post" className="Resetpsw">
          <div className="border border-secondary rounded p-3">
            <div>
                          <p style={{ marginLeft:"20px"}}>We will be sending a reset password link to your email.</p>
            </div>
            <div>
              <p>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your E-mail"
                  required
                  autoFocus
                  onChange={(e) => {
                    setemail(e.target.value);
                                  }}
                                  style={{ width: "300px", height: "30px",marginLeft:"55px"}}
                />
              </p>
              <p className="text-center">
                              <button style={{ backgroundColor:"black",color:"white",marginLeft:"180px",width:"50px",height:"30px",borderRadius:"8px"}} onClick={handlereset}>
                  Send
                </button>
              </p>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
