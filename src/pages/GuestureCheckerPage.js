import {useState} from 'react'
import VideoUtils from '../utils/VideoUtils'

const videoUtils = new VideoUtils()

export default function GuestureCheckerPage() {

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
        <div>
            <p>guesture checker page</p>
            <input type="file" onChange={handleFileUpload} />

            <video id="video" src={videoUtils.getFileUrl()} width="500" height="300" />
            <button onClick={handleStartVideoProcessing}> Start </button>

            <canvas id="canvas" width="500" height="500" />
        </div>
    )
}