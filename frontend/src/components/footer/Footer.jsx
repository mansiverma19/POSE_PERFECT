import React from 'react';
import './Footer.css';
import Pose from '../../image/OSE__1_-removebg-preview.png';


const Footer = () => {
    return (
        <div className='footer'>
            <img className='f-limg' src={Pose} alt='logo' />
            <div className='f-socails'>
                <a href='/'> Twitter</a>
                <a href='/'> Facebook</a>
                <a href='/'> Instagram</a>
            </div>
            <p>Copyright @ 2024 Pose Perfect</p>
        </div>
    )
}

export default Footer
