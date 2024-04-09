import React from 'react';
import './FloatingDiv.css';

const FloatingDiv = ({imoge,txt1,txt2}) => {
  return (
    <div className='floatingDiv'>
        <img src={imoge} alt='thumbsup'/>
        {/* <img src={imoga} alt='thumbsdown'/> */}
        <span>{txt1} <br/>{txt2}</span>
    </div>
  )
}

export default FloatingDiv;