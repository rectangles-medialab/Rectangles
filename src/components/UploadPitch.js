import React, { useState } from 'react';
import '../App.css';
import ml5 from 'ml5';


export default function UploadPitch() {
    const [file, setFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [showNextSection, setShowNextSection] = useState(false);
    const videoFileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];


    const handleUpload = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        setVideoUrl(url);
        console.log(event.target.files[0])
        setFile(event.target.files[0]);
        const videoObject = document.createElement('video')
        videoObject.src = URL.createObjectURL(event.target.files[0])
        console.log(videoObject)
    }

    const handleClick = () => {
        let videoPlaying = false
        let poseNet
        const video = document.getElementById('video');
        console.log(video)
        video.type = file.type
        if(videoFileTypes.indexOf(file.type) === -1) { throw new Error('File is not a video')}
        video.width = 500
        video.height = 500
        video.src = URL.createObjectURL(file)
        video.addEventListener('canplay', () => {
            poseNet = ml5.poseNet(video, (e) => console.log(e));
            video.play()
            videoPlaying = true

            poseNet.on('pose', (results) => {
                if (videoPlaying) {
                    console.log(results)
                }
            });
        })
        // const video = createVideo('testvideo.mp4', () => console.log('video loaded)'))
        
        video.addEventListener('ended', () => {
            videoPlaying = false
        })
        
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
                        <video src={videoUrl} controls width="500" height="300" id="video"/>
                    </div>
                    <div className="next-button-container">
                        <p>Check jou video nog een keer voordat we jou video laat checken door PitchBack. Misschien zijn er nog een paar dingen die je wilt toevoegen of verwijderen?</p>
                        <button className="next-button" onClick={handleClick}>Checken!</button>
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