import { useContext } from 'react';
import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from '../../StepContext';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Secondstep() {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
    const formRef = React.useRef();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setUserData({ ...userData, email: newEmail });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            formRef.current.setCustomValidity('Please enter a valid email address');
        } else {
            formRef.current.setCustomValidity('');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        let hasUpperCase = /[A-Z]/.test(newPassword);
        let hasLowerCase = /[a-z]/.test(newPassword);
        let hasNumber = /\d/.test(newPassword);
        let hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
        setUserData({ ...userData, password: newPassword });
        if (newPassword.length < 8 ||
            !hasUpperCase ||
            !hasLowerCase ||
            !hasNumber ||
            !hasSpecial) {
            formRef.current.setCustomValidity('Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character');
        } else {
            formRef.current.setCustomValidity('');
        }
    };

    return (
        <div>
            <div>
                <TextField label="Email Id" value={userData['emailid']} required inputRef={formRef}
                    onChange={handleEmailChange}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <FormControl sx={{ m: 1, width: '19ch' }} variant="outlined" color='secondary'>
                    <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        size='medium'
                        label="Password"
                        onChange={handlePasswordChange}
                        // onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        value={userData['password']}
                        required inputRef={formRef}
                    />
                </FormControl>
            </div>
            <div>
                <Button varient="contained" onClick={() => setStep(1)} color="secondary">Back </Button>
                <Button varient="contained" onClick={() => { if (formRef.current.reportValidity()) { setStep(3); } }} color="primary">Next </Button>
            </div>
        </div>
    )
}

export default Secondstep;