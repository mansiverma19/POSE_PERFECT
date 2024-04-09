import React, { useState } from 'react';
import './login.css';
import { FaUser } from 'react-icons/fa';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
// import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Pose from '../../image/OSE__1_-removebg-preview.png';
import Halfbg from '../../image/Loginbg.jpg';


const Login = () => {
  const initialLoginData = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const history = useNavigate();
  // State to store login data
  const [loginData, setLoginData] = useState(initialLoginData);
  // State to store email validation error
  const [emailError, setEmailError] = useState('');
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // Redirecting to Home page
      history('/redirect');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validate email format if it's the username field
    if (name === 'email') {
      newValue = value.trim(); // Remove leading and trailing spaces
      console.log(newValue)
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue);
      if (!isValidEmail) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }

    // Update loginData state
    setLoginData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <div className='body'>
      {/* <Navbar /> */}
      <div className='jodi'>
        <div className='drupper'>
          <img className='dpr' src={Halfbg} alt='' />
        </div>
        <div className='wrupper'>
          <img className='w-limg' src={Pose} alt='Pose Perfect Logo' />
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='input-box'>
              <TextField
                className='tf'
                type='text'
                variant="outlined"
                color='secondary'
                label="Email"
                name='email'
                value={loginData.email}
                onChange={handleChange}
                required

              />
              <FaUser className='icons' />
            </div>
            {emailError && <p className='error-message'>{emailError}</p>}
            <div className='input-box'>
              <TextField

                className='tf'
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name='password'
                variant='outlined' color='secondary'
                value={loginData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className='forgot-remember'>
              <label>
                <input
                  type='checkbox'
                  name='rememberMe'
                  checked={loginData.rememberMe}
                  onChange={handleChange}
                />
                Remember Me
              </label>
              <a href='/'> Forgot Password</a>
            </div>
            <Button className='lginbtn' type='submit'>Login</Button>
            <div className='register-link'>
              <p>
                Don't have an account? <a href='/signup'>Register</a>
              </p>
              <p>
                Back to <a href='/'>Home Page</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
