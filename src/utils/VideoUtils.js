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
                    this._videoObject.play()
                    videoPlaying = true
                    document.getElementById('video').play()
        
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

            })

        })
    }


}