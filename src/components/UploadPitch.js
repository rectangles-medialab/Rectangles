import React, { useState } from 'react';
import VideoUtils from '../utils/VideoUtils'
import '../App.css';

const videoUtils = new VideoUtils()

export default function UploadPitch() {
    const [videoUploaded, setVideoUploaded] = useState(false)
    const [uploadError, setUploadError] = useState(false)
    const [processingBusy, setProcessingBusy] = useState(false)
    const [videoProcessed, setVideoProcessed] = useState(false)
    const [processError, setProcessError] = useState(false)

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

    return (
        <div className="app-container">
            <h1>Laat het checken door PitchBack!</h1>
            <p>PitchBack is een tool die jou helpt feedback te geven over  de pitch die je houdt. Hierbij geeft de tool feedbaak op postuur en spraak.</p>

            {!videoUploaded ? (
                // input field
                <div className="">
                    {!uploadError ? (
                        <p>Upload jouw video</p>
                    ) : (
                        <p>Zorg ervoor dat je geuploade bestand een video is</p> //error text if file is not a video
                    )}
                    <input type="file" onChange={handleFileUpload} />
                </div>
            ) : (
                // video uploaded, show file in video element and show process button
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
            )}

        </div>
    );
}