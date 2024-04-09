import React from 'react';
import './Newfeatures.css';
import EXCV from '../../photo/excv.jpg';
import LastLI from '../../photo/prop3rd.png';


const Features = () => {


    return (
        <div className="newExercise">
            <div className='newExright'>
                <img src={EXCV} alt='exav' />
                <img src={LastLI} alt='' />
            </div>
            <div className='newExleft'>
                <span>Motivates You to </span>
                <span>Exercise Daily and</span>
                <span>Stay Away from Medicines</span>
                <span>"Experience personalized support and enhance your workout routine
                    with our AI Fitness Coach, available whenever and wherever you need it,
                    inspiring you to commit to daily exercise and maintain a healthy lifestyle without relying on medications.
                    !"</span>
            </div>
        </div>
    );
}

export default Features