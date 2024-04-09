// import React, { useCallback, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// export default function WebcamVideo() {
//     const webcamRef = useRef(null);
//     const mediaRecorderRef = useRef(null);
//     const [capturing, setCapturing] = useState(false);
//     const [recordedChunks, setRecordedChunks] = useState([]);

//     const handleDataAvailable = useCallback(
//         ({ data }) => {
//             if (data.size > 0) {
//                 setRecordedChunks((prev) => prev.concat(data));
//             }
//         },
//         [setRecordedChunks]
//     );

//     const handleStartCaptureClick = useCallback(async () => {
//         setCapturing(true);
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             webcamRef.current.srcObject = stream;

//             mediaRecorderRef.current = new MediaRecorder(stream, {
//                 mimeType: "video/webm",
//             });
//             mediaRecorderRef.current.addEventListener(
//                 "dataavailable",
//                 handleDataAvailable
//             );
//             mediaRecorderRef.current.start();
//         } catch (error) {
//             console.error('Error accessing camera:', error);
//             setCapturing(false);
//         }
//     }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

//     const handleStopCaptureClick = useCallback(() => {
//         mediaRecorderRef.current.stop();
//         setCapturing(false);
//     }, [mediaRecorderRef, setCapturing]);

//     const handleUpload = useCallback(async () => {
//         if (recordedChunks.length) {
//             const blob = new Blob(recordedChunks, {
//                 type: "video/mp4",
//             });

//             try {
//                 const formData = new FormData();
//                 formData.append('video', blob);

//                 const response = await axios.post('http://localhost:8001/posts', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (response.ok) {
//                     console.log('Video uploaded successfully');
//                     setRecordedChunks([]);
//                 } else {
//                     console.error('Failed to upload video:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error uploading video:', error);
//             }
//         }
//     }, [recordedChunks]);



//     return (
//         <div className="Container">
//             <Webcam
//                 height={400}
//                 width={400}
//                 audio={false}
//                 mirrored={true}
//                 ref={webcamRef}
//             />
//             {capturing ? (
//                 <button onClick={handleStopCaptureClick}>Stop Capture</button>
//             ) : (
//                 <button onClick={handleStartCaptureClick}>Start Capture</button>
//             )}
//             {recordedChunks.length > 0 && (
//                 <button onClick={handleUpload}>uploadload</button>
//             )}
//         </div>
//     );
// }

// WebcamDetection.js
import React, { useState, useEffect } from 'react';
import { PoseLandmarker, DrawingUtils, FilesetResolver } from "@mediapipe/tasks-vision";

function WebcamDetection() {
    const [poseLandmarker, setPoseLandmarker] = useState(null);
    const [runningMode, setRunningMode] = useState("IMAGE");
    const [webcamRunning, setWebcamRunning] = useState(false);

    useEffect(() => {
        const createPoseLandmarker = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            );
            const newPoseLandmarker = await PoseLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
                    delegate: "GPU"
                },
                runningMode: runningMode,
                numPoses: 2
            });
            setPoseLandmarker(newPoseLandmarker);
        };
        createPoseLandmarker();
    }, [runningMode]);

    const handleClick = async (event) => {
        if (!poseLandmarker) {
            console.log("Wait for poseLandmarker to load before clicking!");
            return;
        }

        if (runningMode === "VIDEO") {
            setRunningMode("IMAGE");
            await poseLandmarker.setOptions({ runningMode: "IMAGE" });
        }

        const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
        for (var i = allCanvas.length - 1; i >= 0; i--) {
            const n = allCanvas[i];
            n.parentNode.removeChild(n);
        }

        poseLandmarker.detect(event.target, (result) => {
            const canvas = document.createElement("canvas");
            canvas.setAttribute("class", "canvas");
            canvas.setAttribute("width", event.target.naturalWidth + "px");
            canvas.setAttribute("height", event.target.naturalHeight + "px");
            canvas.style.left = "0px";
            canvas.style.top = "0px";
            canvas.style.width = event.target.width + "px";
            canvas.style.height = event.target.height + "px";

            event.target.parentNode.appendChild(canvas);
            const canvasCtx = canvas.getContext("2d");
            const drawingUtils = new DrawingUtils(canvasCtx);
            for (const landmark of result.landmarks) {
                drawingUtils.drawLandmarks(landmark, {
                    radius: (data) => DrawingUtils.lerp(data.from ? data.from.z : 0, -0.15, 0.1, 5, 1)
                });
                drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
            }
        });
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
            event.target.innerText = "DISABLE PREDICTIONS";
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
                    drawingUtils.drawLandmarks(landmark, {
                        radius: (data) => DrawingUtils.lerp(data.from ? data.from.z : 0, -0.15, 0.1, 5, 1)
                    });
                    drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
                }
                canvasCtx.restore();
            });
        }

        if (webcamRunning === true) {
            window.requestAnimationFrame(predictWebcam);
        }
    };

    return (
        <div className='webacm-pg'>

            <p>Stand in front of your webcam to get real-time pose detection.</p>
            <div id="liveView" className="videoView">
                <button id="webcamButton" className="mdc-button mdc-button--raised" onClick={enableCam}>
                    <span className="mdc-button__ripple"></span>
                    <span className="mdc-button__label">ENABLE WEBCAM</span>
                </button>
                <div style={{ position: 'relative' }}>
                    <video id="webcam" style={{ width: '1280px', height: '720px', position: 'absolute' }} autoPlay playsInline></video>
                    <canvas className="output_canvas" id="output_canvas" width="1280" height="720" style={{ position: 'absolute', left: '0px', top: '0px' }}></canvas>
                </div>
            </div>
        </div>
    );
}

export default WebcamDetection;