import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const notifySuccess = () => {
    toast.success('Login successful!');
  };

  const notifyError = () => {
    toast.error('Invalid credentials. Please try again.');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/auth/login', {
        username,
        password,
      });
      if (response.data && response.data.token) {
        setCookies('access_token', response.data.token);
        window.localStorage.setItem('userID', response.data.userID);
        navigate('/');
        notifySuccess(); // Display success toast notification
      } else {
        notifyError(); // Display error toast notification
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="login-form">
        <h2 className='heading'>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='username'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id='login-form'>
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LogIn;