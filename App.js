import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Create from "./components/Create";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />}></Route>
          <Route path="/Home" exact element={<Home />} />
          {/* <Route path="/Editor1" exact element={<Editor1/>}></Route>
          <Route path="/Feedback" element={<Feedback/>}></Route> */}
          <Route path="/create" exact element={<Create />} />
          <Route path="/SignUp" exact element={<SignUp />}></Route>
          {/* <Route path ="/questions" exact element={<Questions/>}></Route>
          <Route path ="/addquestion" exact element={<Question/>}></Route>
          <Route path ="/showUsers" exact element={<DisplayUsers/>}></Route>
          <Route path ="/edit" exact element={<EditUsers/>}></Route>
          <Route path ="/showQuestions" exact element={<DisplayQuestions/>}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
