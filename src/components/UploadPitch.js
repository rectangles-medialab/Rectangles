import React, { useState } from 'react';
import '../App.css';
import StartProcessor from "./StartProcessor";
import downloadImage from '../images/download.png';

export default function UploadPitch() {
    const [videoUrl, setVideoUrl] = useState('');
    const [showNextSection, setShowNextSection] = useState(false);

    const handleUpload = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        setVideoUrl(url);
    }

    const handleNextSection = () => {
        setShowNextSection(true);
    }

    return (
        <div className="app-container">
            <h1>Weet je niet zeker of jouw pitch goed overkomt bij het publiek?</h1>
            <p>Laat het checken door PitchBack! Dit is een tool die jou helpt feedback te geven over de pitch die je houdt. Hierbij geeft de tool feedback op jouw postuur en spraak.</p>

            {videoUrl ? (

                <div className="video-container">
                    <div>
                        <video src={videoUrl} controls width="500" height="300" />
                    </div>
                    <div className="next-button-container">
                        <h1>Video is geupload!</h1>
                        <p>Bekijk jouw video nog een keer voordat we de video laten controleren door PitchBack.</p>
                        <p>Misschien zijn er nog een aantal dingen die je wilt toevoegen of verwijderen?</p>
                        <button className="next-button" onClick={handleNextSection}>PitchBack Check</button>
                    </div>
                </div>
            ) : (
                <div className="upload-container">
                        <p>Upload hieronder jouw video</p>
                        <input type="file" onChange={handleUpload} id="actual-btn" hiddenid="actual-btn" hidden/>
                        <label for="actual-btn">
                            <img src={downloadImage} alt="Download Button" />
                        </label>
                        {/* <span id="file-chosen">No file chosen</span> */}
                </div>
            )}

            {showNextSection && <StartProcessor />}

        </div>
    );
}