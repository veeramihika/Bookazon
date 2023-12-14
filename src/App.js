import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Create from "./components/Create";
import ResetPsw from "./components/ResetPsw";
import MyBooks from "./components/MyBooks";
import View from "./components/View";
import CartData from "./components/CartData";
import PasswordChange from "./components/PasswordChange";
import Profile from "./components/Profile";
import Myorders from "./components/Myorders";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />}></Route>
          <Route path="/Home" exact element={<Home />} />
          <Route path="/mybooks" exact element={<MyBooks />}></Route>
          <Route path="/resetpsw" exact element={<ResetPsw></ResetPsw>}></Route>
          <Route path="/myorders" exact element={<Myorders></Myorders>}></Route>
          <Route path="/create" exact element={<Create />} />
          <Route path="/SignUp" exact element={<SignUp />}></Route>
          <Route path="/passwordupd" exact element={<PasswordChange />}></Route>
          <Route path="/view/:id" exact element={<View />}></Route>
          <Route path="/mycart" exact element={<CartData />}></Route>
          <Route path="/profile" exact element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
