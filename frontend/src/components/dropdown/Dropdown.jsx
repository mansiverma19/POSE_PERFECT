// import React, { useState } from 'react';
// import './Dropdown.css';
// import { NavLink, useLocation } from 'react-router-dom';
// import handleLogout from '../redirect/Redirect';


// const Dropdown = () => {

//     const location = useLocation();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);


//     // Determine if the current location is the login page
//     const isLoginPage = location.pathname === '/login';

//     // Define the button text and link based on the current location
//     const buttonText = isLoginPage ? 'Logout' : 'Login';
//     const buttonLink = isLoginPage ? { handleLogout } : '/login';

//     const handleLogoutClick = () => {
//         // Perform logout actions here
//         // For example:
//         handleLogout();
//         setIsLoggedIn(false); // Update authentication status
//     };

//     return (
//         <div className='drp-dwn'>
//             <ul className='dp-dn'>
//                 <li className='dli'>Dashboard</li>
//                 <li className='dli'>
//                     <NavLink className='links' to='/redirect'>User Profile</NavLink>
//                 </li>
//                 <li className='dli'>Create New Account</li>
//                 <button className='buts' onClick={isLoggedIn ? handleLogoutClick : null}>
//                     <NavLink className='links' to={buttonLink}>{buttonText}</NavLink>
//                 </button>
//             </ul>
//         </div>
//     )
// }

// export default Dropdown

// import React, { useState } from 'react';
// import './Dropdown.css';
// import { NavLink } from 'react-router-dom';
// import handleLogout from '../redirect/Redirect';

// const Dropdown = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     // Define the button text and link based on the current authentication status
//     const buttonText = isLoggedIn ? 'Logout' : 'Login';
//     const buttonLink = isLoggedIn ? { handleLogout } : '/login';
//     // Assuming '/logout' is the logout route

//     const handleLogoutClick = () => {
//         // Perform logout actions here
//         // For example:
//         handleLogout();
//         setIsLoggedIn(false); // Update authentication status
//     };

//     // Assuming there's a function to handle login, update setIsLoggedIn accordingly
//     const handleLogin = () => {
//         // Perform login actions here
//         // For example:
//         setIsLoggedIn(true); // Update authentication status
//     };



//     return (
//         <div className='drp-dwn'>
//             <ul className='dp-dn'>
//                 <li className='dli'>
//                     <NavLink className='links' to='/redirect'>User Profile</NavLink>
//                 </li>
//                 <li className='dli'>
//                     <NavLink className='links' to='/signup'>Create New Account</NavLink>
//                 </li>
//                 <button className='buts' onClick={isLoggedIn ? handleLogoutClick : handleLogin}>
//                     <NavLink className='links' to={buttonLink}>{buttonText}</NavLink>
//                 </button>
//             </ul>
//         </div>
//     );
// };

// export default Dropdown;

import React from 'react';
import './Dropdown.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// import handleLogout from '../redirect/Redirect';

const Dropdown = () => {
    // Check if the access token exists in local storage
    const accessToken = localStorage.getItem('access_token');
    console.log('Access Token:', accessToken);
    const isLoggedIn = accessToken ? true : false;

    const handleLogout = async () => {
        try {

            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post('http://127.0.0.1:8000/api/auth/blacklist/', {
                refresh: refreshToken,
            });

            // Check if response is empty
            if (response.data.length === 0) {
                // Clear tokens and redirect to login page
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/';
            }
            console.log('Done!!', response.data)
        } catch (error) {
            console.log('Failed to refresh token:', error);
            console.error('Failed to refresh token:', error);

            // Clear tokens and redirect to login page
            window.location.href = '/redirect';
        }
    };


    // Define the button text based on the current authentication status
    const buttonText = isLoggedIn ? 'Logout' : 'Login';

    const handleButtonClick = () => {
        if (isLoggedIn) {
            // Perform logout actions here
            localStorage.removeItem('accessToken'); // Remove the access token from local storage
            handleLogout()
            // Additional logout actions...
        } else {
            // Redirect to the login page
            window.location.href = '/login';
        }
    };



    return (
        <div className='drp-dwn'>
            <ul className='dp-dn'>
                <li className='dli'>
                    <NavLink className='links' to='/redirect'>User Profile</NavLink>
                </li>
                <li className='dli'>
                    <NavLink className='links' to='/signup'>Create New Account</NavLink>
                </li>
                <li className='dli'>
                    <button className='buts' onClick={handleButtonClick}>
                        {buttonText}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Dropdown;

