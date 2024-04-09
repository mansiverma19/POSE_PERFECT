import React from 'react';
import './Morefeatures.css';
import Righttop from '../../photo/left-top.png';
import EXBV from '../../photo/exbv.jpg';



const MoreFeatures = () => {
    return (
        <div className='moreExercise'>
            <div className='moreExleft'>
                <span>Keep's You</span>
                <span>Free from Injury</span>
                <span>By Providing Alerts</span>
                <span>"Keep yourself free from injury with our AI Fitness Coach,
                    providing alerts and offering personalized guidance to refine your exercise form anytime,
                    anywhere you go.!"</span>
            </div>
            <div className='moreExright'>
                <img src={EXBV} alt='exav' />
                <img src={Righttop} alt='' />
            </div>
        </div>
    )
}

export default MoreFeatures
