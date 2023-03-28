import { useState } from 'react';
import VideoToAudio from 'video-to-audio'
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// const ffmpeg = createFFmpeg({ log: true });


function AudioInput() {
//TODO: Upload file as mp4const [audioSrc, setAudioSrc] = useState('');
const [audioSrc, setAudioSrc] = useState('');

  async function convertToAudio(input) {
    let sourceVideoFile = input.files[0];
    let targetAudioFormat = 'mp3';
    let convertedAudioDataObj = await VideoToAudio.convert(sourceVideoFile, targetAudioFormat);
    let audioUrl = URL.createObjectURL(convertedAudioDataObj.blob);
    setAudioSrc(audioUrl);
  }

  function handleFileInputChange(event) {
    convertToAudio(event.target);
  }

  return (
    <div>
    <input type="file" accept="video/*" onChange={handleFileInputChange} />
    {audioSrc && (
      <audio controls src={audioSrc}>
        Your browser does not support the audio element.
      </audio>
    )}
  </div>
);
}
 
  

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

export default AudioInput;


