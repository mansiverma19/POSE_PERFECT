import React from 'react';
import './Howtouse.css';

const Howtouse = () => {
    return (
        <div className='htw-main'>
            <div className='htw-inner'>
                <h2 className='htw-title'>How to Use</h2>
                <div className="htw-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://drive.google.com/file/d/15vl_Eg_M3-h4Apo4OUlzqBDHCRcdVkSD/preview"
                        title="YouTube video player"
                        frameBorder="0"  // Corrected from frameborder to frameBorder
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"  // Corrected from referrerpolicy to referrerPolicy
                        allowFullScreen  // Corrected from allowfullscreen to allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Howtouse;
