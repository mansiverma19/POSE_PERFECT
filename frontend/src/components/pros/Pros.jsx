import React from 'react';
import './Pros.css';
import { NavLink } from 'react-router-dom';


// const Yoga = [
//     "Bhujangasna",
//     "Tadasana",
//     "Vrikshasana",
//     "Matasyaasana",
//     "Padmasana"
// ]

const Exercise = [
    "PushUps",
    "PullUps",
    "Crunches",
    "Barbell Deadlift",
    "Barbell Bench Press"
]

const Pros = () => {
    return (
        <div className='cats-main'>
            <div className='cats-sec'>
                <div className='cats-left'>
                    <h4 className='cat-head'>Exercises</h4>
                    {Exercise.map((exercise, index) => (
                        <div key={index} className='cats-exer'>

                            <p className='yogex'>{exercise}</p>
                        </div>
                    ))}
                    <button className='buts'>
                        <NavLink className='links' to='/signup'>Explore More!!</NavLink>
                    </button>
                </div>
                {/* <div className='cats-right'>
                    <h4 className='cat-head'>Yogas</h4>
                    {Yoga.map((yoga, index) => (
                        <div key={index} className='cats-yoga'>

                            <p className='yogex'>{yoga}</p>
                        </div>
                    ))}
                    <button className='buts'>
                        <NavLink className='links' to='/signup' >Explore More!!</NavLink>
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default Pros
