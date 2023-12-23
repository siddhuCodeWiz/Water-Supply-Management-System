import "./Navbar.css";
import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { HiMiniUserCircle } from "react-icons/hi2";

import Saved from "../../pages/maps";
import Home from "../../pages/Home";
import Auth from "../../pages/auth";
import Createrecipe from "../../pages/createrecipe";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          KMWDS
        </Link>
        {user ? (
          <>
            {user.role === "admin" && (
              <div className="left-side">
                <Link to="/createrecipe" className="nav-link">
                  <span>Complaint</span>
                </Link>
                <Link to="/maps" className="nav-link">
                  <span>Maps</span>
                </Link>
              </div>
            )}
            {user.role === "engineer" && (
              <div className="left-side">
                <Link to="/maps" className="nav-link">
                  <span>Maps</span>
                </Link>
              </div>
            )}
            {user.role === "citizen" && (
              <div className="left-side">
                <Link to="/createrecipe" className="nav-link">
                  <span>Complaint</span>
                </Link>
              </div>
            )}
            <div className="right-side">
              <button
                className="btn"
                onClick={handleLogout}
              >
                Logout
              </button>
              <div className="profile">
                <HiMiniUserCircle className="profile-icon"/>
                <span>{user.role}</span>
              </div>
            </div>
            
          </>
        ) : (
          <div >
            <button className="login-btn">
            <Link to="/auth" className="login-btn-link">
            Login
          </Link>
          </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
