import React, { useEffect, useState } from "react";
//import { styled } from "@mui/material/styles";
import { Button, Card, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
/* import DisplayBooks from "./DisplayBooks"; */
import LandingPage from "./LandingPage.css";
import LoadImage from "./LoadImage";
import  {useNavigate } from "react-router-dom";
import Books from "./Books";
import axios from "axios";
import { ElevatorSharp, Password } from "@mui/icons-material";
function MainContent({ filteredbooks, sortfilter }) {
  let naviagate = useNavigate();
  const [books, setBooks] = useState([]);
  //const [sortbooks, setsortBooks] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    var fk = new FormData();
    fk.append("seller", localStorage.getItem("number"));

    axios.post("http://localhost:8088/getcartcount", fk).then((res) => {
      setCount(res.data);
    });
  }, [books]);
  const handleviewall = (event) => {
    let id = event.target.id;
    console.log(id);
    naviagate(`/view/${id}`);
  };
  useEffect(() => {
    axios.get("http://localhost:8088/getall").then((res) => {
      setBooks(res.data);
    });
  }, []);

  useEffect(() => {
    if (sortfilter == "htol") {


        books.sort((a, b) => 
          (a.price > b.price) ? 1 : -1
        )
      
      
              
            }
    else {

              books.sort((a, b) => (a.price < b.price ? 1 : -1));  
    }




  }, [sortfilter])
  


  useEffect(() => {
    setBooks(filteredbooks);
  }, [filteredbooks]);


  // console.log(books)
  return (
    <div
      className="container"
      style={{
        backgroundColor: "white",
        marginTop: "50px",
        objectFit: "cover",
        position: "absolute",
      }}
    >
      {/*       <div>
        {books.map((book) => (
          <Card
            style={{
              backgroundColor: "whitesmoke",
              width: "500px",
              padding: "10px",
              margin: "10px",
            }}
          >
            <div key={book.product_id}>
              <td>
                <strong>name:</strong> {book.product_name}
              </td>
              <br />
              <td>
                <strong>price:</strong> {book.price} rs
              </td>
              <br />

              <td>
                <strong>seller:</strong>
                {book.nameofseller}
              </td>
              <br />
              <td>
                <LoadImage id={book.product_id}></LoadImage>
              </td>
              <br />
            </div>
          </Card>
        ))} 
    
            </div>*/}
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Books
            data={books}
            setCount={setCount}
            count={count}
          >
            
          </Books>
        </Grid>
      </Grid>
      {/* <button onClick={sorter}>sort</button> */}

      <div className="header__optionBasket">
        <span
          className="header_optionLineTwo header_basketCount"
          style={{
            position: " fixed",
            top: "16px",
            right: "0",
            marginRight: "140px",
            color: "white",
          }}
        >
          {count}
        </span>
      </div>
    </div>
  );
}

export default MainContent;
