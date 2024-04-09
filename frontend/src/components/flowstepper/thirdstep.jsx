// import React, { useContext } from 'react';
// import { Button, TextField } from '@mui/material';
// import { multiStepContext } from '../../StepContext';

// function ThirdStepp() {
//     const { setStep, userData, setUserData } = useContext(multiStepContext);
//     const formRef = React.useRef();
//     return (
//         <div>
//             <div>
//                 <TextField required inputRef={formRef} label="Contact Number" type='contact' value={userData['contact']}
//                     onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
//                     margin='normal' variant='outlined' color='secondary' />
//             </div>
//             <div>
//                 <TextField required inputRef={formRef} label="Address" type='location' value={userData['location']}
//                     onChange={(e) => setUserData({ ...userData, address: e.target.value })}
//                     margin='normal' variant='outlined' color='secondary' />
//             </div>
//             <div>
//                 <Button varient="contained" onClick={() => setStep(2)} color="secondary">Back </Button>
//                 <Button varient="contained" onClick={() => { if (formRef.current.reportValidity()) { setStep(4) } }} color="primary">Next </Button>
//             </div>
//         </div>
//     )
// }

// export default ThirdStepp;
import React, { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from '../../StepContext';

function ThirdStepp() {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
    const formRef = React.useRef();
    const [contactError, setContactError] = useState('');
    const [addressError, setAddressError] = useState('');

    // Function to handle input change and apply constraints
    const handleInputChange = (field, value) => {
        if (field === 'contact') {
            // Validate input as integer and enforce maximum length of 10
            if (!/^\d+$/.test(value) || value.length > 10) {
                setContactError('Contact number should be an integer with a maximum length of 10 digits.');
            } else {
                setContactError('');
            }
        } else if (field === 'address') {
            // Enforce minimum length of 12 and maximum length of 255 characters
            if (value.length < 12 || value.length > 255) {
                setAddressError('Address should be between 12 and 255 characters.');
            } else {
                setAddressError('');
            }
        }
        // Update userData
        setUserData({ ...userData, [field]: value });
    };

    return (
        <div>
            <div>
                <TextField
                    required
                    inputRef={formRef}
                    label="Contact Number"
                    type='number'
                    value={userData['contact']}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    margin='normal'
                    variant='outlined'
                    color='secondary'
                    error={!!contactError}
                    helperText={contactError}
                />
            </div>
            <div>
                <TextField
                    required
                    inputRef={formRef}
                    label="Address"
                    type='text'
                    value={userData['address']}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    margin='normal'
                    variant='outlined'
                    color='secondary'
                    inputProps={{ minLength: 12, maxLength: 255 }}
                    error={!!addressError}
                    helperText={addressError}
                />
            </div>
            <div>
                <Button varient="contained" onClick={() => setStep(2)} color="secondary">Back </Button>
                <Button varient="contained" onClick={() => { if (formRef.current.reportValidity()) { setStep(4) } }} color="primary">Next </Button>
            </div>
        </div>
    )
}

export default ThirdStepp;
