import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // console.warn(email,password)
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const isValidUser = await validateUserFromDatabase(email, password);
      // console.warn(isValidUser)
      if (isValidUser) {
        navigate('/Home');
      } else {
        setError('Invalid user');
      }
    } catch (error) {
      console.error('Error validating user:', error);
      setError('Failed to validate user. Please try again.');
    }
  };

  const validateUserFromDatabase = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/user/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // console.warn(response)
      if (!response.ok) {
        throw new Error('Failed to validate user');
      }

      const result = await response.json();
      // console.log(result);
      return result.success !== undefined ? result.success : false;
    } catch (error) {
      throw error;
    }
  };

  return (

    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login To Get Started</h2>
        <p className="login-text">Please enter your login and password!</p>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
