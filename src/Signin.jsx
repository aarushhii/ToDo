// Signin.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { useAuth } from './context/AuthContext';
import './AuthForm.css';

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const queryParams = new URLSearchParams(location.search);
  const tokenFromSignup = queryParams.get('token');
  const storedSignupDetails = JSON.parse(localStorage.getItem('signupDetails')) || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    
    if (
      formData.name === storedSignupDetails.name &&
      formData.email === storedSignupDetails.email &&
      formData.password === storedSignupDetails.password
    ) {
      // Redirect to ToDoApp page if validation succeeds
      login();
      navigate('/todoapp');
    } else {
      alert('Invalid details. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <div className="auth-form">
        {tokenFromSignup ? (
          <div>
            <p>Generated Token:</p>
            <code>{tokenFromSignup}</code>
          </div>
        ) : (
          <p>No token available. Please sign up first.</p>
        )}

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
};

export default Signin;
