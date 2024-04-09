// import React, { useContext } from 'react';
// import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { multiStepContext } from '../../StepContext';
// import InputAdornment from '@mui/material/InputAdornment';

// function Fourthstep() {
//     const { setStep, userData, setUserData, submitData } = useContext(multiStepContext);
//     const formRef = React.useRef();

//     // Custom validation function for height
//     const isValidHeight = (height) => {
//         // Convert height to numeric value
//         const heightNumeric = parseFloat(height);

//         // Check if height is within the range (2 ft. to 8.5 ft.)
//         return !isNaN(heightNumeric) && heightNumeric >= 2 && heightNumeric <= 8.5;
//     };

//     const handleHeightChange = (e) => {
//         const heightValue = e.target.value;

//         // Check if the entered height is valid
//         if (isValidHeight(heightValue)) {
//             setUserData({ ...userData, height: heightValue });
//         } else {
//             // Clear the height value if it is not valid
//             setUserData({ ...userData, height: '' });
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <TextField required label="Age" value={userData['age']} inputRef={formRef}
//                     onChange={(e) => setUserData({ ...userData, age: e.target.value })}
//                     margin='normal' variant='outlined' color='secondary' />
//             </div>
//             <div>
//                 <FormControl required margin='normal' variant='outlined' color='secondary' sx={{ width: 220 }} inputRef={formRef}>
//                     <InputLabel margin='normal' variant='outlined' color='secondary'>Gender</InputLabel>
//                     <Select
//                         typeof='string'
//                         label="Gender"
//                         value={userData['gender']}
//                         onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
//                     >
//                         <MenuItem color='secondary' value="Male">Male</MenuItem>
//                         <MenuItem value="Female">Female</MenuItem>
//                         <MenuItem value="Other">Other</MenuItem>
//                         <MenuItem value="Not Specified">Don't want to specify</MenuItem>
//                     </Select>
//                 </FormControl>
//             </div>
//             <div>
//                 <TextField
//                     required
//                     inputRef={formRef}
//                     label="Height (ft.)"
//                     sx={{ width: '19ch' }}
//                     value={userData['height']}
//                     onChange={handleHeightChange}
//                     margin='normal'
//                     variant='outlined'
//                     color='secondary'
//                     helperText="Height should be b/w 2 to 8.5 ft."
//                 />
//             </div>
//             <div>
//                 <TextField
//                     required inputRef={formRef}
//                     label="Weight"
//                     sx={{ width: '19ch' }}
//                     margin='normal' variant='outlined' color='secondary'
//                     value={userData['weight']}
//                     onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
//                     InputProps={{
//                         startAdornment: <InputAdornment position="start">kg</InputAdornment>,
//                     }}
//                 />
//             </div>
//             <div>
//                 <Button varient="contained" onClick={() => setStep(3)} color="secondary">Back </Button>
//                 <Button varient="contained" onClick={() => { if (formRef.current.reportValidity()) { submitData() } }} color="primary">Submit </Button>
//             </div>
//         </div>
//     )

// }

// export default Fourthstep

import React, { useContext } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { multiStepContext } from '../../StepContext';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';

function Fourthstep() {
    const { setStep, userData, setUserData, submitData } = useContext(multiStepContext);
    const formRef = React.useRef();

    const isValidHeight = (height) => {
        const heightNumeric = parseFloat(height);
        return !isNaN(heightNumeric) && heightNumeric >= 61 && heightNumeric <= 250;
    };

    const handleHeightChange = (e) => {
        const heightValue = e.target.value;
        // Do not immediately update state on every change
        let tempUserData = { ...userData, height: heightValue };
        // Check if the entered height is valid onBlur
        if (e.type === 'blur' && !isValidHeight(heightValue)) {
            // Clear the height value if it is not valid

            tempUserData = { ...userData, height: '', };

        }
        // Update state after validation onBlur
        setUserData(tempUserData);
    };
    return (
        <div>
            <div>
                <TextField required label="Age" value={userData['age']} inputRef={formRef}
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <FormControl required margin='normal' variant='outlined' color='secondary' sx={{ width: 220 }} inputRef={formRef}>
                    <InputLabel margin='normal' variant='outlined' color='secondary'>Gender</InputLabel>
                    <Select
                        typeof='string'
                        label="Gender"
                        value={userData['gender']}
                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                    >
                        <MenuItem color='secondary' value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        <MenuItem value="Not Specified">Don't want to specify</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField
                    required
                    inputRef={formRef}
                    label="Height (cm.)"
                    sx={{ width: '19ch' }}
                    value={userData['height']}
                    onChange={handleHeightChange}
                    onBlur={handleHeightChange}
                    margin='normal'
                    variant='outlined'
                    color='secondary'
                    helperText="Height should be b/w 61 to 250cm."
                    inputtype="number"
                />
            </div>
            <div>
                <TextField
                    required inputRef={formRef}
                    label="Weight"
                    sx={{ width: '19ch' }}
                    margin='normal' variant='outlined' color='secondary'
                    value={userData['weight']}
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                />
            </div>
            <div>
                <Button varient="contained" onClick={() => setStep(3)} color="secondary">Back </Button>
                <Button varient="contained" onClick={() => { if (formRef.current.reportValidity()) { submitData() } }} color="primary" >
                    <Link to='/login' style={{ textDecoration: 'none' }}>Submit</Link>

                </Button>
            </div>
        </div>
    )

}

export default Fourthstep