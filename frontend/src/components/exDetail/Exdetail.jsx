import React, { useState, useRef, useEffect } from 'react';
import './Exdetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
// import { Link } from 'react-router-dom';
import poseName from '../category/Category';
import WebcamDetection from '../keypoints/Keypoints';
// import data from '../category/Category';

const Exdetail = () => {
    // const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef(null);
    const [exerciseDetails, setExerciseDetails] = useState(null);
    const { exerciseName } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {


        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    // Redirect to login page if access token is missing
                    window.location.href = '/login';
                    return;
                }

                // Check if access token is expired
                const isAccessTokenExpired = isTokenExpired(accessToken);

                if (isAccessTokenExpired) {
                    // Attempt to refresh token
                    await refreshToken();
                }

                // Fetch user data with the new access token
                const newAccessToken = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/UserProfile/', {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                });
                setUser(response.data);
                // console.log(response.data)
                // console.log(response.data[0])

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();

    }, []);

    const isTokenExpired = (token) => {
        // Decode the token to get the expiration time
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.exp < Date.now() / 1000;
    };

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post('http://127.0.0.1:8000/api/auth/refresh/', {
                refresh: refreshToken,
            });

            localStorage.setItem('access_token', response.data.access);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            // Clear tokens and redirect to login page
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
    };

    const handleLogout = async () => {
        try {

            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post('http://127.0.0.1:8000/api/auth/blacklist/', {
                refresh: refreshToken,
            });

            // Check if response is empty
            if (response.data.length === 0) {
                // Clear tokens and redirect to login page
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
            console.log('Done!!', response.data)
        } catch (error) {
            console.log('Failed to refresh token:', error);
            console.error('Failed to refresh token:', error);

            // Clear tokens and redirect to login page
            window.location.href = '/redirect';
        }
    };

    const pose = poseName
    console.log("*********", pose)
    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/Exercise/details/', {
                    POSE: exerciseName
                });
                if (response.status === 200) {
                    setExerciseDetails(response.data);
                    console.log("------------", response.data)
                } else {
                    throw new Error('Failed to fetch exercise details');
                }
            } catch (error) {
                console.error('Error fetching exercise details:', error);
            }
        };

        fetchExerciseDetails();
    }, [exerciseName]);

    const Alings = exerciseDetails && exerciseDetails.ORIENTATION
    // const startCamera = () => {
    //     navigator.mediaDevices.getUserMedia({ video: true })
    //         .then(stream => {
    //             videoRef.current.srcObject = stream;
    //             setIsCameraOn(true);
    //         })
    //         .catch(error => {
    //             console.error('Error accessing camera:', error);
    //         });
    // };

    // const stopCamera = () => {
    //     if (videoRef.current.srcObject) {
    //         const stream = videoRef.current.srcObject;
    //         const tracks = stream.getTracks();
    //         tracks.forEach(track => track.stop());
    //         videoRef.current.srcObject = null;
    //         setIsCameraOn(false);
    //     }
    // };

    return (
        <div className='exd-main'>
            <Navbar />
            <div className='exd-top'>
                <div className='exd-left'>
                    <span>Pose: {exerciseName}</span>
                    <span>Description:</span>
                    <span> {exerciseDetails && exerciseDetails.Description}</span>
                </div>
                <div className='exd-right'>
                    <iframe
                        width="500px"
                        height="300px"
                        src={exerciseDetails && exerciseDetails.GIF}
                        title="YouTube video player"
                        frameBorder="0"  // Corrected from frameborder to frameBorder
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"  // Corrected from referrerpolicy to referrerPolicy
                        allowFullScreen  // Corrected from allowfullscreen to allowFullScreen
                    ></iframe>
                </div>
            </div>
            <br />
            <div className='exd-bottom'>
                <div className='exd-crd'>
                    {exerciseDetails && (
                        <div>
                            <h2 className='crd-head'>Steps:</h2>
                            <ul>
                                {exerciseDetails.Steps.split('\n').map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* <ul>
                        {exerciseDetails && exerciseDetails.Steps && exerciseDetails.Steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul> */}
                </div>

                <div className='exd-crd'>
                    {exerciseDetails && (
                        <div>
                            <h2 className='crd-head'>Advantage:</h2>
                            <ul>
                                {exerciseDetails.Advantage.split('\n').map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* <ul>
                        {exerciseDetails && exerciseDetails.Advantages && exerciseDetails.Advantages.map((advantage, index) => (
                            <li key={index}>{advantage}</li>
                        ))}
                    </ul> */}
                </div>
                <div className='exd-crd'>
                    {exerciseDetails && (
                        <div>
                            <h2 className='crd-head'>Precaution:</h2>
                            <ul>
                                {exerciseDetails.Precaution.split('\n').map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* <ul>
                        {exerciseDetails && exerciseDetails.Precautions && exerciseDetails.Precautions.map((precaution, index) => (
                            <li key={index}>{precaution}</li>
                        ))}
                    </ul> */}
                </div>
                <div className='exd-crd-webcam'>
                    <WebcamDetection />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Exdetail;
