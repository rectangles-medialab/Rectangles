import React, { useState } from 'react';
import '../App.css';
import StartProcessor from "./StartProcessor";
import downloadImage from '../images/download.png';
import onePerson from '../images/een_persoon_in_beeld.png';
import soundEnvironment from '../images/omgevingsgeluid.png';
import fitOnScreen from '../images/volledig_in_beeld.png';
import FeedbackList from './FeedbackList';

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
        <div className="container">
            <div className="app-container">
                <div class="header">
                <h1>Breng jouw pitch naar het volgende niveau!</h1>
                    <div class="container">
                        <img src={onePerson} alt="one Person" class="animated-image" />
                        <div class="text">
                            <h2><span>1.</span> Pitch opnemen</h2>
                            <p>Voordat je de pitch upload moet het eerst opgenomen worden. Let hierop bij de audio en video.</p>
                        </div>
                    </div>
                    <div class="container">
                        <img src={fitOnScreen} alt="one Person" class="animated-image" />
                            <div class="text">
                                <h2><span>2.</span> Upload jouw Pitch</h2>
                                <p>Nu jouw pitch opgenomen is kan je jouw video uploaden. Zorg ervoor dat er 1 iemand in beeld staat</p>
                            </div>
                    </div>

                    <div class="container">
                        <img src={soundEnvironment} alt="one Person" class="animated-image" />
                        <div class="text">
                            <h2><span>3.</span> Implementeer de feedback</h2>
                            <p>Implementeer deze feedback in jouw volgende video en upload deze opnieuw, zo vaak als je wilt.</p>
                        </div>
                    </div>
                </div>
                <div className="upload-video-container">
                    <div className="upload-container">
                        <p>Upload hieronder jouw video.</p>
                        <input type="file" onChange={handleUpload} id="actual-btn" hiddenid="actual-btn" hidden />
                        <label for="actual-btn">
                            <img src={downloadImage} alt="Download Button" />
                        </label>
                    </div>

                    {videoUrl && (
                    
                        <div className="main-container">
                            <div className="video-container">
                                <div>
                                    <video src={videoUrl} controls width="500" height="300" />
                                </div>
                                <div className="next-button-container">
                                    <h1>Video is geupload!</h1>
                                    <p>Bekijk jouw video nog een keer voordat we de video laten controleren door PitchBack.</p>
                                    <p>Misschien zijn er nog een aantal dingen die je wilt toevoegen of verwijderen?</p>
                                </div>
                            </div>
                            <div className="new-section">
                                <button className="next-button" onClick={handleNextSection}>PitchBack Check</button>
                            </div>
                        </div>
                    
                    )}

                </div>

                {showNextSection && <FeedbackList />}
            </div>
        </div>
    );
}