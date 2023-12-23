import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./Home.css";
// import "./auth.css"
import Navbar from "./components/Navbar/Navbar";
import Saved from "./pages/maps";
import Home from "./pages/Home";
import Auth from "./pages/auth";
import Createrecipe from "./pages/createrecipe.js";
import LoginLogout from "./components/LoginLogout/LoginLogout.jsx";
export default function App() { 
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="createrecipe" element={<Createrecipe />} />
          <Route path="auth" element={<LoginLogout/>} />
          <Route path="maps" element={<Saved/>} />
    </Routes>
    </BrowserRouter>
  );
}


