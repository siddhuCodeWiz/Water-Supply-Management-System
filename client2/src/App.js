import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./Home.css";
// import "./auth.css"
import Navbar from "./components/Navbar/Navbar";
import Saved from "./pages/maps";
// import Home from "./pages/Home";
import Home from "./components/HomePage/Home.jsx";
import YourConnections from "./components/YourConnections/YourConnections.jsx";

import Auth from "./pages/auth";
import LoginLogout from "./components/LoginLogout/LoginLogout.jsx";

import Createrecipe from "./pages/createrecipe.js";
// import Complaint from "./components/Complaints/Complaints.jsx";
import Complaint from "./components/Complaints/ComplaintList.jsx"

export default function App() { 
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="createrecipe" element={<Createrecipe />} /> */}
          <Route path="complaint" element={<Complaint />} />
          <Route path="auth" element={<LoginLogout/>} />
          <Route path="maps" element={<Saved/>} />
          <Route path="your-connections" element={<YourConnections/>} />
    </Routes>
    </BrowserRouter>
  );
}