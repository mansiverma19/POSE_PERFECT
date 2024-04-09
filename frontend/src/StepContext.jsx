import React, { useState } from 'react'
import Signup from './components/signuppages/SignUppages';
import axios from 'axios';

export const multiStepContext = React.createContext();

const StepContext = () => {

    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);

    function submitData() {
        setFinalData(finalData => [...finalData, userData]);
        setUserData(' ');
        setStep(1);
        console.log(userData);
        axios.post("http://127.0.0.1:8000/api/auth/register/", userData)
            .then(response => {
                console.log('Data sent successfully');
                console.log(response);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    }




    return (
        <div>
            <multiStepContext.Provider
                value={{
                    currentStep,
                    setStep,
                    userData,
                    setUserData,
                    finalData,
                    setFinalData,
                    submitData
                }}
            >
                <Signup />
            </multiStepContext.Provider>
        </div>
    )
}

export default StepContext;