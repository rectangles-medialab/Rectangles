import React, { useState } from 'react';
import '../App.css';

function PitchbackPage() {
const [video, setVideo] = useState(null);

const handleFileChange = (event) => {
const file = event.target.files[0];
if (file) {
setVideo(URL.createObjectURL(file));
}
};

  return (
  <div className="pitchback-container">
    <h1 className="pitchback-title">Weet je niet zeker of jouw pitch goed overkomt bij het publiek?</h1>
    <p className="pitchback-description">Laat het checken door PitchBack! Dit is een tool die jou helpt feedback te geven over de pitch die je houdt. Hierbij geeft de tool feedback op jouw postuur en spraak.</p>
    <p className="pitchback-upload-text">Upload hieronder jouw video</p>
    <div className="pitchback-upload">
    <input type="file" onChange={handleFileChange} />
  </div>
  {video && (
  <div className="pitchback-video">
    <video src={video} width="640" height="480" controls />
    <button className="pitchback-remove-button" onClick={() => setVideo(null)}>Remove Video</button>
  </div>
    )}
  </div>
);
}

export default PitchbackPage;
