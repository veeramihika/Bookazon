import React from "react";
import "./LandingPage.css";
import { useState } from "react";


import {
  Button,
  TextField,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
  let navigate = useNavigate();
  const [name, setname] = useState("");
  const [author, setAuthor] = useState();
  const [price, setprice] = useState();
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState();
  const [nameofseller, setnameofseller] = useState();
  const [image, setimage] = useState();
  const changePic = (e) => {
    setimage(e.target.files[0]);

  };

  const handlecreate = (event) => {
    event.preventDefault();

    var producti = new FormData();
    producti.append("product_name", name);
    producti.append("author", author);
    producti.append("price", price);
    producti.append("category", category);
    producti.append("description", description);
    producti.append("nameofseller", nameofseller);
    producti.append("mobileno", localStorage.getItem("number"));
    producti.append("image", image);
    var orders=[]
    producti.append("orders",orders)
    axios.post("http://localhost:8088/Create", producti);
    navigate("/home");
    window.alert("added successfully");
  };
  return (
    <Container maxWidth={false}>
      <Box margin={1} className="brand">
        <b>Bookazon</b>
      </Box>

      <Container>
        <Grid container direction="row">
          <Grid container item xs={8}>
            <Card elevation={3}>
              <CardContent>
                <img
                  src="https://www.savethestudent.org/uploads/colourful-patterned-books-bright-background.jpg"
                  style={{ width: "100%", height: "auto" }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={4}>
            <Card container component="form" elevation={3}>
              <Box
                container
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                width="100%"
                height="auto"
              >
                <CardContent component="form">
                  <CardHeader
                    title="Add Book"
                    style={{ color: "#7267CB", fontSize: "9px" }}
                  />

                  <TextField
                    className="field"
                    label="Name"
                    type="text"
                    name="name"
                    required
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    value={name}
                    margin="dense"
                  />
                  <TextField
                    className="field"
                    label="Author"
                    type="text"
                    name="author"
                    required
                    onChange={(e) => {
                      setAuthor(e.target.value);
                  }}/>

                  <TextField
                    type="number"
                    className="field"
                    label="price"
                    name="price"
                    value={price}
                    onChange={(e) => {
                      setprice(e.target.value);
                    }}
                    margin="dense"
                    required
                  />
                  <TextField
                    type="text"
                    className="field"
                    label="category"
                    onChange={(e) => {
                      setcategory(e.target.value);
                    }}
                    name="category"
                    value={category}
                    margin="dense"
                    required
                  />
                  <TextField
                    type="text"
                    className="field"
                    label="description"
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    margin="dense"
                    required
                  />

                  <TextField
                    type="text"
                    className=" field"
                    label="nameofseller"
                    name="nameofseller"
                    onChange={(e) => {
                      setnameofseller(e.target.value);
                    }}
                    value={nameofseller}
                    margin="dense"
                    required
                  />
                  <TextField
                    type="file"
                    className="field"
                    
                    name="picture"
                    onChange={changePic}
                    margin="dense"
                    required
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handlecreate}
                  >
                    Add Book
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
