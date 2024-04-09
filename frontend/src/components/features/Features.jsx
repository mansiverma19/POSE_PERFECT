import React from 'react';
import './Features.css';
import EXAV from '../../photo/exav.jpg';
import Leftside from '../../photo/left.png';


const Features = () => {


  return (
    <div className="exercise">
      <div className='exright'>
        <img src={EXAV} alt='exav' />
        <img src={Leftside} alt='' />
      </div>
      <div className='exleft'>
        <span>Your Personalized </span>
        <span>AI Fitness Coach</span>
        <span>Anytime-Anywhere</span>
        <span>"Unlock personalized guidance and refine your exercise form
          with our AI Fitness Coach, accessible anytime and anywhere you go!"</span>
      </div>
    </div>
  );
}

export default Features