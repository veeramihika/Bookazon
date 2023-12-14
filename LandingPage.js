import React from "react";
import "./LandingPage.css";

import Login1 from "./Login1";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
export default function LandingPage() {
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
            <Card elevation={3}>
              <Box
                container
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                lineHeight={2}
              >
                <Login1 />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
