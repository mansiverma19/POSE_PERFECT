import React from 'react';
import './Home.css';
import Vector1 from '../../image/Vector1.png';
import Vector2 from '../../image/Vector2.png';
import Thumbs from '../../image/thumbup.png';
import ThumbsDown from '../../image/thumbdown.png';
import Injury from '../../image/injurry.png';
import FloatingDiv from '../floatingDiv/FloatingDiv';
import FloatDiv from '../floatingDiv/FloatDiv';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='h-main'>
      <div className='h-left'>
        <div className='h-head'>
          <span>A New Medium for</span>
          <span>Perfect and Injuryfree</span>
          <span>Fitness Activities</span>
          <span>You can practice and perform differnt Yogasanas and varities of Exercises perfectly using
            our web application and get corrections for wrong postures you're making during fitness activities.

          </span>
        </div>
        <button className='h-buto'>
          <Link className='newlnk' to='/signup'>Start for Free !!</Link>
        </button>
      </div>
      <div className='h-right'>
        <img src={Vector1} alt='v1' />
        <img src={Vector2} alt='v2' />
        <img src={Injury} alt='injury' />
        <div className='ftd'>
          <FloatingDiv imoge={Thumbs} txt1='Correct' txt2='Pose' />
        </div>
        <div className='floatdown'>
          <FloatDiv imoga={ThumbsDown} txt1='Incorrect' txt2='Pose' />
        </div>
      </div>
    </div>
  )
}

export default Home