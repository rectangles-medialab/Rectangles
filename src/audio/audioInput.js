import React, { useState } from "react";

const VoiceCounter = () => {
  const [recognizedWord, setRecognizedWord] = useState("");
  const [counter, setCounter] = useState(0);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const recognition = new window.webkitSpeechRecognition();

  const startRecording = () => {
    recognition.start();
    setRecording(true);
  };

  const stopRecording = () => {
    recognition.stop();
    setRecording(false);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorder.start();
  };

  const handleDataAvailable = (event) => {
    const blob = new Blob([event.data], { type: "audio/mp4" });
    setAudioUrl(URL.createObjectURL(blob));
  };

  //testing with hello (needs to be changed to "Uh, eh, hm")
  recognition.onresult = (event) => {
    const word = event.results[0][0].transcript;
    setRecognizedWord(word);
    if (word === "hello") {
      setCounter(counter + 1);
    }
  };

  const handleStartClick = () => {
    startRecording();
  };

  const handleStopClick = () => {
    stopRecording();
  };

  return (
    <div>
      <button onClick={handleStartClick} disabled={recording}>
        Start Recording
      </button>
      <button onClick={handleStopClick} disabled={!recording}>
        Stop Recording
      </button>
      <div>Recognized word: {recognizedWord}</div>
      <div>Counter: {counter}</div>
      <audio src={audioUrl} controls />
    </div>
  );
};

export default VoiceCounter;
