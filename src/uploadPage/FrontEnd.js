import React, { useState } from 'react';
import './FrontEnd.css';

function App() {
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
            <h1>Laat het checken door PitchBack!</h1>
            <p>PitchBack is een tool die jou helpt feedback te geven over  de pitch die je houdt. Hierbij geeft de tool feedbaak op postuur en spraak.</p>

            {videoUrl ? (

                <div className="video-container">
                    <div>
                        <video src={videoUrl} controls width="500" height="300" />
                    </div>
                    <div className="next-button-container">
                        <p>Check jou video nog een keer voordat we jou video laat checken door PitchBack. Misschien zijn er nog een paar dingen die je wilt toevoegen of verwijderen?</p>
                        <button className="next-button" onClick={handleNextSection}>Volgende</button>
                    </div>
                </div>
            ) : (
                <div className="upload-container">
                    <p>Upload jouw video</p>
                    <input type="file" onChange={handleUpload} />
                </div>
            )}

            {showNextSection && (
                <div className="next-container">
                    <p>Nice</p>
                </div>
            )}
        </div>
    );
}

export default App;
