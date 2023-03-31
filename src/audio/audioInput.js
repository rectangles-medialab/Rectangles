import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';

function VideoInput() {
  const [model, setModel] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setVideoSrc(videoUrl);
  };

  const handleVideoPlay = async () => {
    const videoElement = document.getElementById('video');
    const speechModel = await speechCommands.create('BROWSER_FFT');
  
    const audioData = await extractAudioData(videoElement);
    const spectrogram = tf.tidy(() => {
      const waveform = tf.tensor(audioData);
      const pad = tf.zeros([speechModel.modelInputShape[0] - waveform.shape[0] % speechModel.modelInputShape[0]]);
      const padded = tf.concat([waveform, pad], 0);
      const framed = tf.signal.frame(padded, speechModel.modelInputShape[0], speechModel.modelInputShape[0] / 2).transpose();
      const windowed = framed.mul(tf.signal.hammingWindow(speechModel.modelInputShape[0]));
      const batched = windowed.reshape([windowed.shape[0], windowed.shape[1], 1]);
      return speechModel.recognize(batched);
    });
  
    setPrediction(spectrogram[0].toLowerCase());
  };
  

  const extractAudioData = async (videoElement) => {
    const mediaStream = await videoElement.captureStream();
    const audioContext = new AudioContext();
    const audioSourceNode = audioContext.createMediaStreamSource(mediaStream);
    const analyserNode = audioContext.createAnalyser();
    audioSourceNode.connect(analyserNode);
    analyserNode.fftSize = 2048;
    const bufferLength = analyserNode.frequencyBinCount;
    const audioData = new Float32Array(bufferLength);
    analyserNode.getFloatTimeDomainData(audioData);
    return audioData;
  };

  useEffect(() => {
    const loadModel = async () => {
      const speechModel = await speechCommands.create('BROWSER_FFT', undefined, 'https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/vocab.json', 'https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/model.json');
      await speechModel.ensureModelLoaded();
      setModel(speechModel);
      setMetadata(speechModel.modelMetadata);
    };

    loadModel();
  }, []);

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {videoSrc && (
        <div>
          <video id="video" src={videoSrc} onPlay={handleVideoPlay} controls></video>
        </div>
      )}
      {prediction && (
        <div>
          <p>Prediction:</p>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default VideoInput;










// import React, { useState, useEffect, useRef } from 'react';
// import ml5 from 'ml5';
// import model from './model.json';
// import metadata from './metadata.json';

// // https://teachablemachine.withgoogle.com/models/NGlGZN4Z6/

// const VideoAnalyzer = () => {
//   const [videoFile, setVideoFile] = useState(null);
//   const [classificationResult, setClassificationResult] = useState(null);

//   const videoRef = useRef(null);
//   const classifierRef = useRef(null);

//   useEffect(() => {
//     if (videoFile) {
//       const video = videoRef.current;

//       const soundClassifierOptions = {
//         includeSpectrogram: true,
//         probabilityThreshold: 0.7,
//         modelUrl: model,
//         metadataUrl: metadata,
//         audio: video
//       };
      
//       const classifier = ml5.soundClassifier('model1', soundClassifierOptions, () => {
//         console.log('Model loaded');
//       });

//       classifierRef.current = classifier;

//       // Start classifying the video's audio frames
//       classifierRef.current.classify((error, result) => {
//         if (error) {
//           console.error(error);
//           return;
//         }

//         setClassificationResult(result);
//       });

//      // Set the video source and start playing
//       video.srcObject = URL.createObjectURL(videoFile);
//       video.play();

//       return () => {
//         // Stop the classifier when the component unmounts
//         classifierRef.current.stop();
//       };
//     }
//   }, [videoFile]);

//   const handleVideoUpload = (event) => {
//     setVideoFile(event.target.files[0]);
//   };

//   const handleClassificationResult = (result) => {
//     if (result && classificationResult && result.label !== classificationResult.label) {
//       setClassificationResult(result);
//       console.log(result)
//     }
//   };
  

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={handleVideoUpload} />
//       {classificationResult && (
//         <p>The current sound classification is: {classificationResult.label}</p>
//       )}
//       <video ref={videoRef} controls onPlay={() => classifierRef.current.classify(handleClassificationResult)} />
//     </div>
//   );
// };

// export default VideoAnalyzer;









//TODO: MP4 gets automatically converted to MP3
//TODO: MP3 will be analysed with ML5 (js)
//TODO: The analyser gives feedback on amounts of "uh" you're saying

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//   const audioNodeRef = useRef(null);
//   const analyserNodeRef = useRef(null);

//   useEffect(() => {
//     new p5((p) => {
//       p.setup = () => {
//         p.createCanvas(640, 480).parent(canvasRef.current);
//         videoRef.current = p.createCapture(p.VIDEO, () => {
//           videoRef.current.hide();
//           audioNodeRef.current = audioContext.createMediaElementSource(videoRef.current.elt);
//           analyserNodeRef.current = audioContext.createAnalyser();
//           audioNodeRef.current.connect(analyserNodeRef.current);
//           analyserNodeRef.current.connect(audioContext.destination);
//         });
//       };
  
//       p.draw = () => {
//         p.image(videoRef.current, 0, 0, 640, 480);
//       };
//     });
//   }, []);

//   const classifier = ml5.soundClassifier('SpeechCommands18w', () => {});

//   useEffect(() => {
//     const classifyAudio = () => {
//       const bufferLength = analyserNodeRef.current.frequencyBinCount;
//       const dataArray = new Uint8Array(bufferLength);
//       analyserNodeRef.current.getByteFrequencyData(dataArray);
//       classifier.classify(dataArray, (err, results) => {
//         if (err) {
//           console.error(err);
//         } else {
//           setClassification(results[0].label);
//         }
//       });
//     };
//     setInterval(classifyAudio, 1000); // classify audio every second
//   }, []);


// return (
//   <div>
//       <canvas ref={canvasRef} />
//       <p>Current classification: {classification}</p>
//     </div>
// );



