import ml5 from 'ml5';

export default class VideoUtils {
    _fileUrl
    _fileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
    _videoObject
    _videoObjectReady = false
    _videoPoses = []


    getFileUrl() {return this._fileUrl}


    upload(e) {

        return new Promise((resolve, reject) => {

            this._videoObject = document.createElement('video')
            const file = e.target.files[0]
            const fileUrl = URL.createObjectURL(file)
            this._videoObject.src = fileUrl.toString()
            this._videoObject.width = 500
            this._videoObject.height = 300
            this._videoObject.addEventListener('canplay', () => this._videoObjectReady = true)

            if(this._fileTypes.indexOf(file.type) === -1) { 

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

                console.log(this._videoPoses)
                this.analyzeFile()

            })

        })
    }

    analyzeFile() {

        let co = []

        for (let i = 1; i < this._videoPoses.length; i++) {
            
            co.push({i: i, co: this.calculateCoefficient(
                this._videoPoses[i].leftWrist.x,
                this._videoPoses[i-1].leftWrist.x,
                this._videoPoses[i].leftWrist.y,
                this._videoPoses[i-1].leftWrist.y
                )})
            
        }

        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')

        ctx.strokeStyle = 'blue'
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.moveTo(0, 0 + (canvas.clientHeight / 2))
        for (const c of co) {
            ctx.lineTo(
                (c.i * 5), 
                (c.co * 5) + (canvas.clientHeight / 2)
                )
        }
        ctx.stroke()

    }

    calculateCoefficient(x1, y1, x2, y2) {
        return ( x2 - x1 ) / ( y2 - y1 )
    }


}