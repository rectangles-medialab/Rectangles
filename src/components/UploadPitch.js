import React, { useState } from 'react';
import VideoUtils from '../utils/VideoUtils'
import '../App.css';
import FeedbackList from "./FeedbackList";
import downloadImage from '../assets/download.png';

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

    
    //components used in return 

    const uploadFieldComponent = () => {
        return (
            <div className="upload-container">

                {!uploadError ? (
                    <p>Upload jouw video</p>
                ) : (
                    <p>Zorg ervoor dat je geuploade bestand een video is</p> //error text if file is not a video
                )}

                <input type="file" onChange={handleFileUpload} id="actual-btn" hiddenid="actual-btn" hidden />
                <label htmlFor="actual-btn">
                    <img src={downloadImage} alt="Download Button" />
                </label>

                

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
            <input id="model" type="file" multiple onChange={videoUtils.uploadModel}></input>
            <h1>Weet je niet zeker of jouw pitch goed overkomt bij het publiek?</h1>
            <p>Laat het checken door PitchBack! Dit is een tool die jou helpt feedback te geven over de pitch die je houdt. Hierbij geeft de tool feedback op jouw postuur en spraak.</p>

            {videoProcessed == false ?

                videoUploaded == false ? (

                    // upload video
                    uploadFieldComponent()

                ) : (

                    // video uploaded, start checking
                    videoStartCheckComponent()

                ) : (

                    // feedback
                    <FeedbackList />

                )}

        </div>
    );
}