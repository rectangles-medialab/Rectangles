import ml5 from 'ml5';

export default class VideoUtils {
    _file
    _fileUrl
    _fileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
    _videoObject
    _videoObjectReady = false
    _videoPoses = []
    _videoResults = []
    _videoResultsAvarage = []

    getFileUrl() { return this._fileUrl }


    upload(e) {

        return new Promise((resolve, reject) => {

            this._videoObject = document.createElement('video')
            const file = e.target.files[0]
            this._file = file
            const fileUrl = URL.createObjectURL(file)
            this._videoObject.src = fileUrl.toString()
            this._videoObject.width = 500
            this._videoObject.height = 300
            this._videoObject.addEventListener('canplay', () => this._videoObjectReady = true)

            if (this._fileTypes.indexOf(file.type) === -1) {

                reject()

            } else {

                this._fileUrl = fileUrl
                resolve()

            }

        })

    }


    processFile() {
        //TODO reject promise if video processing failed

        return new Promise((resolve, reject) => {

            this._videoPoses = []
            let videoPlaying = false
            let options = {
                architecture: 'MobileNetV1',
                detectionType: 'single'
            }

            try {
                if (this._videoObjectReady) {

                    //start tracking pose in video
                    let poseNet = ml5.poseNet(this._videoObject, options, null)

                    this._videoObject.muted = true
                    this._videoObject.playbackRate = 0.5
                    this._videoObject.play()
                    videoPlaying = true

                    let HTMLvideo = document.getElementById('video')
                    HTMLvideo.playbackRate = 0.5
                    HTMLvideo.play()
                    HTMLvideo.muted = true

                    //only track pose if video is playing
                    poseNet.on('pose', (results) => {
                        if (videoPlaying) {

                            this._videoPoses.push(results[0].pose)

                        }
                    })

                } else {

                    throw new Error('Video not ready yet, trying again...')

                }
            } catch (e) {

                if (!this._videoObjectReady) setTimeout(() => this.processFile(), 1000)

            }

            //stop video tracking if video has ended
            this._videoObject.addEventListener('ended', async () => {

                videoPlaying = false


                //TODO call classify before resolving
                // this.classify()
                resolve()

                this.analyzeFile()

                await this.classify(this._videoResultsAvarage)
                console.log(await this._videoResults.length)

                const values = []

                for(const videoResult of this._videoResults) {
                    console.log(videoResult)
                    for(const d of videoResult) {
                        console.log(d)
                        values.push(d)
                    }
                }

                console.log(values)
                

                // for (const result of this._videoResults) {
                //     console.log(this.classify(result))
                //     waveValues.push(await this.classify(result))
                //     normalValues.push(await this.classify(result))
                // }

                // console.log(normalValues)
                // console.log(waveValues)
                // for(const c of classifiedResults) {

                // }

            })

        })
    }

    classify(inputArray) {

        return new Promise((resolve, reject) => {
            const options = {
                task: 'classification' // or 'regression'
            }
            const nn = ml5.neuralNetwork(options);
    
            const modelDetails = {
                model: 'https://vishaal010.github.io/jsonAPI/model/model.json',
                metadata: 'https://vishaal010.github.io/jsonAPI/model/model_meta.json',
                weights: 'https://vishaal010.github.io/jsonAPI/model/model.weights.bin'
              }
    
            const modelLoaded = () => {
                for(const input of inputArray) {
                    nn.classify(input, classified)
                }
                resolve()
            }
    
            const classified = (error, result) => {
                this._videoResults.push(result)
            }
    
            // console.log(nn.load(modelDetails, modelLoaded))
            nn.load(modelDetails, modelLoaded)
        })

    }

    createNgram(video) {
        let ngrams = [];
        const ngramSize = 20;

        for (let i = 0; i < video.frames.length; i += ngramSize) {
          if (i + ngramSize <= video.frames.length) {
            const ngram = video.frames.slice(i, i + ngramSize);
            ngrams.push(ngram);
          }
        }

        for (let i = 0; i < ngrams.length; i++) {
            const ngram = ngrams[i];

            const avgKeypoints = {};

            for (let j = 0; j < ngram.length; j++) {
              const frame = ngram[j];

              for (const keypoint in frame) {
                if (avgKeypoints[keypoint] === undefined) {
                  avgKeypoints[keypoint] = 0;
                }

                avgKeypoints[keypoint] += frame[keypoint];
              }
            }

            for (const keypoint in avgKeypoints) {
              avgKeypoints[keypoint] /= ngram.length;
            }

            this._videoResultsAvarage.push(avgKeypoints)
          }


    }

    analyzeFile() {

        let results = []

        for (let i = 1; i < this._videoPoses.length; i++) {

            let obj = {
                "nose": {},
                "leftEye": {},
                "rightEye": {},
                "leftEar": {},
                "rightEar": {},
                "leftShoulder": {},
                "rightShoulder": {},
                "leftElbow": {},
                "rightElbow": {},
                "leftWrist": {},
                "rightWrist": {},
                "leftHip": {},
                "rightHip": {},
                "leftKnee": {},
                "rightKnee": {},
                "leftAnkle": {},
                "rightAnkle": {}
            }
            for (const [key, value] of Object.entries(this._videoPoses[i])) {
                obj[key] = this.calculateCoefficient(
                    this._videoPoses[i][key].x,
                    this._videoPoses[i - 1][key].x,
                    this._videoPoses[i][key].y,
                    this._videoPoses[i - 1][key].y
                )
            }

            results.push(obj)

        }


        let thing = {
            name: this._file.name.split(".")[0],
            frames: results

        }

        this.createNgram(thing)

    }

    calculateCoefficient(x1, y1, x2, y2) {
        return (x2 - x1) / (y2 - y1)
    }


}