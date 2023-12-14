import React from "react";
import { Card, Grid } from "@mui/material";
import LoadImage from "./LoadImage";
import axios from "axios";

import { useNavigate } from "react-router-dom";
export default function Books({ data, setCount, count }) {
  let naviagate = useNavigate();
  const addtocart = (event) => {
    var fd = new FormData();
    fd.append("product_id", event.target.id);
    fd.append("mobile_no", localStorage.getItem("number"));
    axios.post("http://localhost:8088/addcart", fd);
    setCount(count + 1);
  };
  const handleviewall = (event) => {
    let id = event.target.id;
    console.log(id);
    naviagate(`/view/${id}`);
  };

  return (
    <div>
      <Grid container justifyContent="center" spacing={5}>
             {data.map((item) => {
            
          return (
            <Grid key={item.product_id} item>
              <Card
                sx={{
                  height: 500,
                  width: 250,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <td>
                  <LoadImage
                    id={item.product_id}
                    h={"250px"}
                    w={"250px"}
                  ></LoadImage>
                </td>
                <br />
                <td>
                  <strong>Name:</strong> {item.product_name}
                </td>
                <br />
                <td>
                  <strong>Author:</strong> {item.author}
                </td>
                <br />
                <td>
                  <strong>Price:</strong>Rs.{item.price}
                </td>
                <br />

                <td>
                  <strong>Seller:</strong>
                  {item.nameofseller}
                </td>
                <br />
                <td>
                  <button
                    style={{ marginLeft: "30px", cursor: "pointer",backgroundColor:"#FFD814",borderColor:"#FCD200" }}
                    id={item.product_id}
                    onClick={addtocart}
                  >
                    Add to cart
                  </button>
                  <button
                    style={{ marginLeft: "10px", cursor: "pointer",backgroundColor:"#FFD814",borderColor:"#FCD200" }}
                    id={item.product_id}
                    onClick={handleviewall}
                  >
                    View details
                  </button>
                </td>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
