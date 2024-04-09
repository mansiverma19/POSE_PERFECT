import React from 'react';
import './Floatdiv.css';

const FloatDiv = ({imoga,txt1,txt2}) => {
  return (
    <div className='floatDiv'>
        <img src={imoga} alt='thumbsup'/>
        <span>{txt1} <br/>{txt2}</span>
    </div>
  )
}

export default FloatDiv;