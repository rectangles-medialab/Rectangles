import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import fs from "fs";

function TeachableMachine() {
  const [recognizer, setRecognizer] = useState(null);
  const [classLabels, setClassLabels] = useState([]);
  const [labelContainer, setLabelContainer] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const modelURL = "https://teachablemachine.withgoogle.com/models/ptOfwlb7h/model.json";
      const metadataURL = "https://teachablemachine.withgoogle.com/models/ptOfwlb7h/metadata.json";
      const model = await tf.loadLayersModel(tf.io.browserFiles([modelURL, metadataURL]));
      const commands = JSON.parse(await fs.promises.readFile(metadataURL));

      const recognizer = speechCommands.create("BROWSER_FFT", null, model);
      await recognizer.ensureModelLoaded();
      setRecognizer(recognizer);
      setClassLabels(commands.wordLabels);

      const container = document.getElementById("label-container");
      setLabelContainer(container);
      for (let i = 0; i < commands.wordLabels.length; i++) {
        container.appendChild(document.createElement("div"));
      }

      recognizer.listen((result) => {
        const scores = result.scores;
        for (let i = 0; i < classLabels.length; i++) {
          const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
          labelContainer.childNodes[i].innerHTML = classPrediction;
        }
      }, {
        includeSpectrogram: true,
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50
      });
    }

    loadModel();

    return () => {
      if (recognizer) {
        recognizer.stopListening();
      }
    };
  }, [recognizer, classLabels, labelContainer]);

  return (
    <div>
      <div>Teachable Machine Audio Model</div>
      <button type="button" onClick={() => recognizer && recognizer.listen()}>Start</button>
      <div id="label-container"></div>
    </div>
  );
}

export default TeachableMachine;

