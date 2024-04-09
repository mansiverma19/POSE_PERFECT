

import React, { useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from '../../StepContext';

function Firststep() {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
    const formRef = React.useRef();

    // Function to handle input change and apply constraints
    const handleInputChange = (field, value) => {
        // Enforce maximum length of 60 characters
        if (value.length <= 60) {
            // Restrict input to only uppercase and lowercase characters
            const filteredValue = value.replace(/[^a-zA-Z]/g, '');
            setUserData({ ...userData, [field]: filteredValue });
        }
    };

    return (
        <div>
            <div>
                <TextField
                    required
                    inputRef={formRef}
                    label="First Name"
                    value={userData['firstname']}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                    margin='normal'
                    variant='outlined'
                    color='secondary'
                    inputProps={{ maxLength: 60 }}
                />
            </div>
            <div>
                <TextField
                    required
                    inputRef={formRef}
                    label="Last Name"
                    value={userData['lastname']}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    margin='normal'
                    variant='outlined'
                    color='secondary'
                    inputProps={{ maxLength: 60 }}
                />
            </div>
            <div>
                <Button varient="contained" onClick={() => { if (formRef.current.reportValidity()) { setStep(2); } }}
                    color="primary">Next </Button>
            </div>


        </div>
    );
}

export default Firststep;
