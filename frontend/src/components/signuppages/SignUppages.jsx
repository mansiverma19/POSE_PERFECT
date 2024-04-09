/* eslint-disable react/prop-types */


import React, { useContext } from 'react';
import './Signup.css';
import Navbar from '../navbar/Navbar';
import Firststep from '../flowstepper/firststep';
import SecondStep from '../flowstepper/secondstep';
import ThirdStep from '../flowstepper/thirdstep';
import { Stepper, StepLabel, Step } from '@mui/material';
import { multiStepContext } from '../../StepContext';
import Fourthstep from '../flowstepper/Fourthstep';



function SignUppages() {

    const { currentStep } = useContext(multiStepContext);

    const showStep = (step) => {
        switch (step) {
            case 1:
                return <Firststep />
            case 2:
                return <SecondStep />
            case 3:
                return <ThirdStep />
            case 4:
                return <Fourthstep />
            default:
                return null
        };
    }

    return (
        <div className='signups'>
            <Navbar ></Navbar>
            <div className='signupcover'>
                <div className='pgcenter'>
                    <div className='pghed'>
                        <h2 className='sgup'>Singup</h2>
                        <div className='centralStepper'>
                            <Stepper className='steppers' style={{ width: "19%" }} activeStep={currentStep - 1} orientation='horizontal'>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                            </Stepper>
                        </div>
                        <div className='sgbox'>
                            {showStep(currentStep)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUppages;
