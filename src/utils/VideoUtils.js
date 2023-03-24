import ml5 from 'ml5';

export default class VideoUtils {
    _file
    _fileUrl
    _fileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
    _videoObject
    _videoObjectReady = false
    _videoPoses = []


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
            this._videoObject.addEventListener('ended', () => {

                videoPlaying = false
                resolve()

                this.analyzeFile()

            })

        })
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

        console.log(thing)

    }

    calculateCoefficient(x1, y1, x2, y2) {
        return (x2 - x1) / (y2 - y1)
    }


}