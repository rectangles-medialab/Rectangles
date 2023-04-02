import React, { useState } from 'react';
import VideoUtils from '../utils/VideoUtils'
import '../App.css';
import downloadImage from '../images/download.png';
import onePerson from '../images/een_persoon_in_beeld.png';
import soundEnvironment from '../images/omgevingsgeluid.png';
import fitOnScreen from '../images/volledig_in_beeld.png';
import FeedbackList from './FeedbackList';

const videoUtils = new VideoUtils()

export default function UploadPitch() {
    const [videoUploaded, setVideoUploaded] = useState(false)
    const [uploadError, setUploadError] = useState(false)
    const [processingBusy, setProcessingBusy] = useState(false)
    const [videoProcessed, setVideoProcessed] = useState(false)
    const [, setProcessError] = useState(false)


    const handleFileUpload = async (e) => {

        await videoUtils.upload(e)
            .then(() => {
                //if previous upload attempt failed, remove upload error
                setUploadError(false)
                setVideoUploaded(true)
            })
            .catch(() => setUploadError(true))

    }


    const handleStartVideoProcessing = async () => {
        setProcessingBusy(true)

        //video utils already has the uploaded file saved
        await videoUtils.processFile()
            .then(() => {
                setProcessError(false)
                setVideoProcessed(true)
                setProcessingBusy(false)
            })
            .catch(() => setProcessError(true))
    }


    //components used in return 

    const uploadFieldComponent = () => {
        return (
            <div>
                <div className="header">
                    <div className="container">
                        <img src={onePerson} alt="one Person" className="animated-image" />
                        <div className="text">
                            <h2><span>1.</span> Pitch opnemen</h2>
                            <p>Voordat je de pitch upload moet het eerst opgenomen worden. Zorg ervoor dat alleen jij op beeld staat.</p>
                        </div>
                    </div>
                    <div className="container">
                        <img src={fitOnScreen} alt="one Person" className="animated-image" />
                        <div className="text">
                            <h2><span>2.</span> Ruimte opname</h2>
                            <p>Zorg ervoor dat je volledig in beeld bent. De ruimte moet niet te licht of donker zijn.</p>
                        </div>
                    </div>

                    <div className="container">
                        <img src={soundEnvironment} alt="one Person" className="animated-image" />
                        <div className="text">
                            <h2><span>3.</span> Omgevingsgeluid</h2>
                            <p>Zorg ervoor dat je jouw pitch opneemt in een ruimte met niet te veel achtergrond geluid.</p>
                        </div>
                    </div>
                </div>

                <div className="upload-video-container">
                    <div className="upload-container">
                        {!uploadError ? (
                            <p>Upload jouw video</p>
                        ) : (
                            <p style={{ color: "red" }}>Je bestand is geen video. Probeer het opnieuw</p> //error text if file is not a video
                        )}
                        <input type="file" onChange={handleFileUpload} id="actual-btn" hiddenid="actual-btn" hidden />
                        <label htmlFor="actual-btn">
                            <img src={downloadImage} alt="Download Button" />
                        </label>
                    </div>

                    {videoUtils.getFileUrl() && (

                        <div className="main-container">
                            <div className="video-container">
                                <div>
                                    <video src={videoUtils.getFileUrl()} controls width="500" height="300" />
                                </div>
                                <div className="next-button-container">
                                    <h1>Video is geupload!</h1>
                                    <p>Bekijk jouw video nog een keer voordat we de video laten controleren door PitchBack.</p>
                                    <p>Misschien zijn er nog een aantal dingen die je wilt toevoegen of verwijderen?</p>
                                </div>
                            </div>
                            <div className="new-section">
                                <button className="next-button" onClick={handleStartVideoProcessing}>PitchBack Check</button>
                            </div>
                        </div>

                    )}

                </div>
            </div>

        )
    }


    const videoStartCheckComponent = () => {
        return (
            <div className="video-container">
                <div>
                    <video id="video" src={videoUtils.getFileUrl()} width="500" height="300" />
                </div>
                <div className="next-button-container">
                    <p>Check jou video nog een keer voordat we jou video laat checken door PitchBack. Misschien zijn er nog een paar dingen die je wilt toevoegen of verwijderen?</p>
                    {!processingBusy ? (
                        <button className="next-button" onClick={handleStartVideoProcessing}>Check video</button>
                    ) : (
                        <p>Checking...</p>
                    )}
                </div>
            </div>
        )
    }


    return (
        <div className="app-container">
            <h1>Breng jouw pitch naar een hoger niveau!</h1>

            <p>Laat het checken door PitchBack! Dit is een tool die jou helpt feedback te geven over de pitch die je houdt. Hierbij geeft de tool feedback op jouw postuur en spraak.</p>

            {videoProcessed === false ?

                videoUploaded === false ? (

                    // upload video
                    uploadFieldComponent()

                ) : (

                    // video uploaded, start checking
                    videoStartCheckComponent()

                ) : (

                    // feedback
                    <FeedbackList feedback={videoUtils.getClassification()} />

                )}

            {/* {videoProcessed && <FeedbackList feedback={videoUtils.getClassification()}/>} */}
        </div>
    );
}