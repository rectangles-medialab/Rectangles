import React, { useState } from "react";
import ffmpeg from "ffmpeg.js";
import DeepSpeech from "deepspeech";

const VoiceCounter = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const transcribeAudio = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      // Step 2: Read the contents of the file as an ArrayBuffer
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(selectedFile);
      });

      // Step 3: Convert the mp4 file to an audio file format using ffmpeg.js
      const ffmpegInstance = await ffmpeg();
      await ffmpegInstance.FS("writeFile", "input.mp4", new Uint8Array(arrayBuffer));
      await ffmpegInstance.run("-i", "input.mp4", "output.wav");
      const outputArrayBuffer = await ffmpegInstance.FS("readFile", "output.wav");

      // Step 4: Transcribe the audio to text using Mozilla DeepSpeech
      const model = new DeepSpeech.Model("path/to/deepspeech/model");
      const scorer = new DeepSpeech.Scorer("path/to/deepspeech/scorer");
      const audioBuffer = new Int16Array(outputArrayBuffer);
      const result = model.stt(audioBuffer, scorer);
      setTranscription(result);

      // Step 5: Display the transcribed text to the user
      // You could render it as plain text or use a text-to-speech library to read it aloud
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={transcribeAudio}>Transcribe</button>
      <div>{transcription}</div>
    </div>
  );
}

export default VoiceCounter;

