import IconButton from "@mui/material/IconButton";
import "./LandingPage.css";
import MainContent from "./MainContent";
import Header from "./Header";
import { useState } from "react";
import ChatBot from 'react-simple-chatbot';
import { SiChatbot} from "react-icons/si";
function Home() {
  const [filteredbooks, setfilteredbooks] = useState([]);
  const [sortfilter, setsortfilter] = useState("");
  const steps = [
    {
      id: '1',
      message: 'Hey there, how can I help you?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Issue with placing order', trigger: '3' },
        { value: 2, label: 'Unable to add to cart', trigger: '3' },
        { value: 3, label: 'Unable to remove my product from sale', trigger: '3' },
        {value:4, label: 'other issue', trigger:'3'}
      ]
    },
    {
      id: '3',
      message:'please ellaborate', 
      trigger:4
    },
    {
      id: '4',
      user:true
    }

  ];
  const [show,setshow]=useState(false)
  const handlechatbot =event=>{
    setshow(current => !current);
  }
  return (
    <div className="bg-image">
      <Header
        setfilteredbooks={setfilteredbooks}
        setsortfilter={setsortfilter}
      ></Header>
      <MainContent filteredbooks={filteredbooks} sortfilter={sortfilter}></MainContent>
      <IconButton onClick={handlechatbot} sx={{ p: 0 }}>
              <SiChatbot
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "30px",
                  padding: "0px",
                  position:"top",
                  marginLeft:"3000px",
                  marginTop:"1250px",
                  position:"fixed"
                
                }}
              />
            </IconButton>
      {show && <ChatBot steps={steps} style={{float:"right",marginTop:"70px"}} />}
    </div>
  );
}

export default Home;
