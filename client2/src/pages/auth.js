import React from  "react";
import { useState } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import LoginLogout from '../components/LoginLogout/LoginLogout.jsx'
import "./auth.css";

const Auth = () => {
  return (
    <div class="auth">
      {/* <Login/>
      <Register/> */}
      <LoginLogout/>
    </div>
  )
}
const Register=()=>{
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const onSubmit= async(event)=>{
    event.preventDefault();
    try{
      await axios.post("http://localhost:3006/auth/register",{
        username,
        password,})
      alert("Registeration completed!  Login now");
    }catch(err){
      console.error(err);
    }
  }
  return (
    <Form username={username}  setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>
  )
}
const Login=()=>{
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const[,setCookies]=useCookies(["access_token"]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3006/auth/login", {
        username,
        password,
      });
      if (response.data && response.data.token) {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in. Please try again later.");
    }
  };
  return (<Form username={username}  setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>);
};


const Form = ({ username,setUsername,password,setPassword,label,onSubmit})=>{
  return(
    <div className="auth-container">
      <form  onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="username" value={username} onChange={(event)=>setUsername(event.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="password" value={password} onChange={(event)=>setPassword(event.target.value)}></input>
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>

  )
}


 export default Auth;