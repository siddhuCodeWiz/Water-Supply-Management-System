// import React from 'react';
// import './Signup.css'

// const Signup = ({ onSubmit }) => {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform sign-in logic and call the provided onSubmit function
//     onSubmit(email, password);
//   };

//   return (
//     <form onSubmit={handleSubmit} className='signup-form'>
//       <h2>Sign Up</h2>
//       <div className="form-group">
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button type="submit" className='signup-btn'>Sign Up</button>
//     </form>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import axios from 'axios';
// import {ToastContainer, toast} from 'react-toastify';
// import 'client2/public/New Water Supply Project/node_modules/react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/auth/register", {
        username,
        phone,
        email,
        password,
      });
      alert(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
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
      <button type="submit" className='signup-btn'>
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
