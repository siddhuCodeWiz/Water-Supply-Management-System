import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSendOtp = async () => {
    const apiUrl = 'http://localhost:5001/api/send-otp';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('OTP sent successfully');
        setOtpSent(true);
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };

  const handleVerifyOtp = async () => {
    const apiUrl = 'http://localhost:5001/api/verify-otp';  // Corrected the endpoint

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userEnteredOtp: otp }),
      });

      if (response.ok) {
        console.log('OTP verified successfully');
        setVerified(true)
        // Proceed with your additional actions, e.g., make the POST request
      } else {
        console.error('OTP verification failed');
        // You can handle the error and show an error message to the user
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
    }
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    if (verified) {
      try { 
        alert(JSON.stringify({username, phone, email, password}))
            const response = await axios.post("http://localhost:5001/auth/register", {
              username,
              phone:phone,
              email,
              password,
              role:"citizen"
            });
            alert(response.data.message);
          } catch (err) {
            console.error(err);
          }
    } else {
      console.error('OTP not sent');
    }
  };


  

  return (
    <form className='signup-form'>
      <h2 className='heading'>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="phone"
          id="phone"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='off'
        />
      </div>
      <div className="form-group">
      <label>
        OTP:
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={!otpSent}
        />
      </label>
      </div>
      
      <button type="button" onClick={handleSendOtp} disabled={otpSent}>
        Send OTP
      </button>
      <button type="button" onClick={handleVerifyOtp} disabled={!otpSent}>
        Verify OTP
      </button>
      <button type="submit" onClick={handleFormSubmit} disabled={!verified}>
        Submit
      </button>
      
    </form>
  );
};

export default Signup;