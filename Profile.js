import { Button, Grid} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userdata, setuserdata] = useState([]);
  useEffect(() => {
    var fd = new FormData();
    fd.append("number", localStorage.getItem("number"));
    axios.post("http://localhost:8088/details", fd).then((res) => {
      setuserdata(res.data);
    });
  }, []);
  const navigate = useNavigate();
  const naviagatehome = () => {
    navigate("/home");
 }
  return (
    <div className="bo" style={{position: "absolute", width: "100%", height: "100%",color:"white" }}>
    
    
      {userdata.map((user) => {
        return (
          <Grid
            key={user.id}
            style={{ marginLeft: "500px", marginTop: "250px" }}
          >
            <td>
              <strong>Full Name</strong>
              <input
                type="text"
                readOnly
                value={user.fullname}
                style={{ marginLeft: "100px", width: "200px" }}
              ></input>
            </td>
            <br />
            <td>
              <strong> Email</strong>
              <input
                type="text"
                readOnly
                value={user.email}
                style={{ marginLeft: "135px", width: "200px" }}
              ></input>
            </td>
            <br />
            <td>
              <strong>Mobile Number</strong>
              <input
                type="text"
                readOnly
                value={user.mobile}
                style={{ marginLeft: "55px", width: "200px" }}
              ></input>
            </td>
            <br />
            <td>
              <strong>Address </strong>
              <input
                type="text"
                readOnly
                value={user.address}
                style={{ marginLeft: "110px", width: "200px" }}
              ></input>
            </td>
          </Grid>
        );
      })}
      <Button style={{marginLeft:'630px',marginTop:"100px",backgroundColor:"black"}} onClick={naviagatehome}>Go back</Button>
    </div>

  );
}
