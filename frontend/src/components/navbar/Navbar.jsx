

import React, { useState, useEffect } from 'react';
import Pose from '../../image/OSE__1_-removebg-preview.png';
import { NavLink, useLocation } from 'react-router-dom';
import Menu from '../dropdown/Dropdown';
import handleLogout from '../redirect/Redirect';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSticky, setIsSticky] = useState(false);


  const location = useLocation();


  // Determine if the current location is the login page
  const isLoginPage = location.pathname === '/login';

  // Define the button text and link based on the current location
  const buttonText = isLoginPage ? 'Logout' : 'Login';
  const buttonLink = isLoginPage ? { handleLogout } : '/login';

  useEffect(() => {
    const checkScreenWidth = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 768); // Adjust the breakpoint as needed
    };

    // Check screen width initially and add event listener for resizing
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={isSticky ? 'n-wrapper  sticky blur' : 'n-wrapper'} id="navbar">
      <div className='n-left'>
        <img className='n-limg' src={Pose} alt='Pose Perfect Logo' />
      </div>
      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='n-right'>
        <div className='n-list'>
          <ul className={menuOpen ? 'open' : ''}>
            <li className='nli'>
              <NavLink className='links' to='/'>Home</NavLink>
            </li>
            <li className='nli'>
              <NavLink className='links' to='/category'>Categories</NavLink>
            </li>
            <li className='nli'>
              <NavLink className='links' to='/about'>About</NavLink>
            </li>
            {isMobile ? (
              <>
                <li className='nli'>
                  <NavLink className='links'>User Profile</NavLink>
                </li>
                <li className='nli'>
                  <NavLink className='links' to='/signup'>Creae New Account</NavLink>
                </li>
                <button className='buts'>
                  <NavLink className='links' to={buttonLink}>{buttonText}</NavLink>
                </button>
              </>


            ) : (
              <li className='noli'>
                <NavLink onClick={() => setIsOpen(!isOpen)} className='links'>Menu</NavLink>
                {isOpen && (<Menu />)}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
