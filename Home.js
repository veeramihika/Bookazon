import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./LandingPage.css";
import MainContent from "./MainContent";
import SideMenu from "./SideMenu";
import TopMenu from "./TopMenu";
import Header from "./Header";
import { useState } from "react";
function Home() {
  const [filteredbooks, setfilteredbooks] = useState([]);
  const [sortfilter, setsortfilter] = useState("");
  return (
    <div className="bg-image">
      <Header
        setfilteredbooks={setfilteredbooks}
        setsortfilter={setsortfilter}
      ></Header>
      <MainContent filteredbooks={filteredbooks} sortfilter={sortfilter}></MainContent>
    </div>
  );
}

export default Home;
