import React, { useState } from 'react';
import './Workers.css';

const AddWorker = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }

    console.log(formData);
  };

  return (
    <div className='whole'>
      <button className='btn' onClick={() => setShowModal(true)}>Add Worker</button>
      {showModal && (
          <div className="worker">
            <div className="worker-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h2 className="form-title">Add Worker</h2>
              <form className="worker-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                />
                <button type="submit" className="submit-button">
                  Add Worker
                </button>
              </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default AddWorker;