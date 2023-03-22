import React, { useState, useEffect } from 'react';
import ml5 from 'ml5';

function PoseRecorder() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // Initialize the video capture and create a new dataset
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setVideo(stream);
        ml5.data.createStream({
          stream: stream,
          numLabels: 1,
          label: 'pose'
        });
      })
      .catch(error => console.error(error));

    return () => {
      // Release the video capture when the component unmounts
      if (video) {
        video.getTracks().forEach(track => track.stop());
      }
      ml5.data.clear();
    }
  }, [video]);

  return (
    <div>
      <video
        ref={videoElement => { videoElement.srcObject = video }}
        autoPlay
        playsInline
      />
    </div>
  );
}

export default PoseRecorder;