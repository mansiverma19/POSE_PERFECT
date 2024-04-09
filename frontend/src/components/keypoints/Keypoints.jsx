


// WebcamDetection.js
import React, { useState, useEffect } from 'react';
import { PoseLandmarker, DrawingUtils, FilesetResolver } from "@mediapipe/tasks-vision";
import './Keypoints.css';
import Aligns from '../exDetail/Exdetail'

function WebcamDetection() {
    const [isHovered, setIsHovered] = useState(false);
    const [poseLandmarker, setPoseLandmarker] = useState(null);
    const [runningMode, setRunningMode] = useState("IMAGE");
    const [webcamRunning, setWebcamRunning] = useState(false);
    const align = Aligns;
    const userHeight = 180;

    useEffect(() => {
        const createPoseLandmarker = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                // "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );

            const newPoseLandmarker = await PoseLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
                    // modelAssetPath: 'C:/Users/mansi/VS Code Program/project/Django project/Pose Perfect/frontend/src/components/keypoints/pose_landmarker_heavy.task',
                    delegate: "GPU"
                },
                runningMode: runningMode,
                numPoses: 2
            });
            setPoseLandmarker(newPoseLandmarker);
        };
        createPoseLandmarker();
    }, [runningMode]);

    const drawBoundingBox = (canvasElement, landmarks, userHeight) => {
        const canvas = canvasElement;
        const ctx = canvas.getContext('2d');

        // Get frame dimensions
        const frameWidth = canvas.width;
        const frameHeight = canvas.height;

        // Calculate rectangle dimensions
        const xCenter = frameWidth / 2;
        const yCenter = frameHeight / 2;
        let rectHeight = frameHeight - (frameHeight * 0.30); // 30% of the frame
        let rectWidth = frameWidth - (frameWidth * 0.30); // 30% of the frame

        // Adjust height and width according to user's height and alignment
        // const align = 'V'; // Vertical alignment, you can change it to 'H' for horizontal
        // const userHeight = 100; // Example user height, replace with actual value
        if (align === 'V') {
            rectHeight = frameHeight - (frameHeight * 0.35);
            rectWidth = frameWidth - (frameWidth * 0.40);
        } else if (align === 'H') {
            rectHeight = frameHeight - (frameHeight * 0.50)
            rectWidth = frameWidth - (frameWidth * 0.10);
        }

        // Calculate top-left and bottom-right corners
        const topLeftX = Math.max(0, xCenter - rectWidth / 2);
        const topLeftY = Math.max(0, yCenter - rectHeight / 2);
        const bottomRightX = Math.min(frameWidth, topLeftX + rectWidth);
        const bottomRightY = Math.min(frameHeight, topLeftY + rectHeight) + 30;

        // Draw rectangle
        ctx.strokeStyle = 'blue'; // Border color
        ctx.lineWidth = 2; // Border width
        ctx.strokeRect(topLeftX, topLeftY, bottomRightX - topLeftX, bottomRightY - topLeftY);
        let isPersonDetected = false;
        for (const landmark of landmarks) {
            console.log("======", frameWidth, "========", frameHeight)
            console.log('rect width : ', rectWidth, landmark.x)
            console.log('rect height : ', rectHeight, landmark.y)
            const x = landmark.x * frameWidth;
            const y = landmark.y * frameHeight;
            console.log(topLeftX, "--------------", x, '---------------', bottomRightX)
            console.log(topLeftY, "**************", y, '***************', bottomRightY)
            if (x >= topLeftX && x <= bottomRightX && y >= topLeftY && y <= bottomRightY) {
                isPersonDetected = true;
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1')
            }
            else {
                isPersonDetected = false;
                break
            }
        }

        // Draw text based on whether a person is detected inside the box or not
        if (isPersonDetected) {
            const text = 'Start Exercise...';
            ctx.fillStyle = 'lightgreen'; // Text color
            ctx.font = '25px Arial'; // Font
            ctx.fillText(text, topLeftX, topLeftY - 5); // Position text above the rectangle

            // Extract landmarks within bounding box
            const landmarksWithinBox = landmarks.slice(9, 30);

            // Randomly select 1 or 2 indexes
            const randomIndexes = [];
            while (randomIndexes.length < Math.min(2, landmarksWithinBox.length)) {
                const randomIndex = Math.floor(Math.random() * landmarksWithinBox.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }  
              // Draw red filled circles at selected indexes
            ctx.fillStyle = 'red';
            ctx.beginPath();
            for (const index of randomIndexes) {
                const landmark = landmarksWithinBox[index];
                const x = landmark.x * frameWidth;
                const y = landmark.y * frameHeight;
                ctx.moveTo(x, y);
                ctx.arc(x, y, 5, 0, Math.PI * 2);
            }
            ctx.fill();
        } else {
            const text = 'Get Inside...';
            ctx.fillStyle = 'red'; // Text color
            ctx.font = '25px Arial'; // Font
            ctx.fillText(text, topLeftX, topLeftY - 5);        
        }
    };

    const enableCam = (event) => {
        if (!poseLandmarker) {
            console.log("Wait! poseLandmaker not loaded yet.");
            return;
        }

        if (webcamRunning === true) {
            setWebcamRunning(false);
            event.target.innerText = "ENABLE PREDICTIONS";
        } else {
            setWebcamRunning(true);
            event.target.innerText = "START";
        }

        const constraints = {
            video: true
        };

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            const video = document.getElementById("webcam");
            video.srcObject = stream;
            video.addEventListener("loadeddata", predictWebcam);
        });
    };


    let lastVideoTime = -1;

    const predictWebcam = () => {
        const video = document.getElementById("webcam");
        const canvasElement = document.getElementById("output_canvas");
        const canvasCtx = canvasElement.getContext("2d");
        const drawingUtils = new DrawingUtils(canvasCtx);

        if (runningMode === "IMAGE") {
            setRunningMode("VIDEO");
            poseLandmarker.setOptions({ runningMode: "VIDEO" });
        }

        let startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
            lastVideoTime = video.currentTime;
            poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
                canvasCtx.save();
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                for (const landmark of result.landmarks) {
                    const style = {
                        color: 'white',
                        fillColor: '#7CFC00',
                        lineWidth: 3,
                        radius: 8
                    };
                    // drawingUtils.drawLandmarks(landmark, {
                    //     radius: (data) => DrawingUtils.lerp(data.from ? data.from.z : 0, -0.15, 0.1, 5, 1)
                    // });
                    drawingUtils.drawLandmarks(landmark, style);
                    drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, style);

                    drawBoundingBox(canvasElement, landmark, userHeight);
                }
                canvasCtx.restore();
            });
        }

        if (webcamRunning === true) {
            window.requestAnimationFrame(predictWebcam);
        }
    };

    const buttonStyles = {
        height: '50px',
        width: '100%',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'none',
        cursor: 'pointer',
        backgroundColor: '#a300d1',
        backgroundImage: 'linear-gradient(315deg, #a300d1, #ff844a)',
        border: '1px solid',
        borderRadius: '8px',
        padding: '0 35px',
        fontSize: '15px',
        fontWeight: '500',
        lineHeight: '50px',
        // marginLeft: '65px',
        // paddingLeft: '35px',
        transition: 'all .2s ease-in-out',
        display: 'inline-block',
        ...(isHovered && {
            backgroundColor: '#d10000',
            backgroundImage: 'linear-gradient(315deg, #d10000, #d54aff)',
            border: '8px solid linear-gradient(315deg, #a300d1, #ff844a)',
            borderRadius: '50px'
        })
    };

    return (
        <div className='webacm-pg'>
            <div id="liveView" className="videoView">
                <button
                    id="webcamButton"
                    className="mdc-button mdc-button--raised exd-btn"
                    onClick={enableCam}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={buttonStyles}
                >                  <span className="mdc-button__ripple"></span>
                    <span className="mdc-button__label">Enable Webcam</span>
                </button>
                <div style={{ position: 'relative' }} className='cam-veiw'>
                    {/* <video id="webcam" style={{ width: '820px', height: '820px', position: 'relative', }} autoPlay playsInline></video>
                    <canvas id="output_canvas" width="820" height="20" style={{ position: 'absolute', left: '0px', top: '0px',  }}></canvas> */}
                    <video
                        id="webcam"
                        style={{ width: '820px', height: '720px', position: 'relative', zIndex: 1 }}
                        autoPlay
                        playsInline
                    ></video>
                    <canvas
                        id="output_canvas"
                        width="820px"
                        height="650px"
                        style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 2 }}
                    ></canvas>
                </div>
            </div>
        </div>
    );
}

export default WebcamDetection;

