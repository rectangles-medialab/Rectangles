import { useState } from 'react';
import ml5 from 'ml5';

function VideoInput() {

    const [file, setFile] = useState(null);
    const videoFileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];


    const handleUpload = async (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);

        //create a non-visible video element
        const videoObject = document.createElement('video')

        //put video file in video HTMLElement
        videoObject.src = URL.createObjectURL(e.target.files[0])
        console.log(videoObject)

    }

    const handleClick = () => {
        let videoPlaying = false
        let poseNet
        const video = document.getElementById('video');
        video.type = file.type

        //checking if video has correct type (is video?)
        if(videoFileTypes.indexOf(file.type) === -1) { throw new Error('File is not a video')}
        
        //adding video properties
        video.width = 500
        video.height = 500
        video.src = URL.createObjectURL(file)

        //waiting for video to be loaded in DOM
        video.addEventListener('canplay', () => {
            //start tracking pose in video
            poseNet = ml5.poseNet(video, (e) => console.log(e));
            video.play()
            videoPlaying = true

            //only track pose if video is playing
            poseNet.on('pose', (results) => {
                if (videoPlaying) {
                    console.log(results)
                }
            });
        })

        //stop video tracking if video has ended
        video.addEventListener('ended', () => {
            videoPlaying = false
        })
        
    }

    return (
        <div>
            <video id='video'/>
            {/* <video controls id='video' src="testvideo.mp4" type="video/mp4"/> */}
            <input 
                type="file"
                onChange={handleUpload}
            />
            <button onClick={handleClick}>klik lol </button>
        </div>
    )
}

// class WhatsInThisImage extends React.Component {
//     constructor(props) {
//       super(props);
//       this.imageRef = React.createRef();
//       this.state = {
//         prediction: {
//           className: "",
//           probability: ""
//         },
//         isLoading: false,
//         error: null
//       };
//       this.predict = this.predict.bind(this);
//     }
//     async predict() {
//       if (!this.imageRef.current) return;
//       this.setState(s => ({ ...s, isLoading: true }));
//       console.log("HIII");
//       // hack for slow connections
//       await delay(2000);
//       console.log("Hiyein");
//       try {
//         const classifier = await ml5.imageClassifier("MobileNet");
//         const results = await classifier.predict(this.imageRef.current);
//         console.log("Hiyein 3");
//         if (results.length === 0) {
//           this.setState({ error: new Error("NO_PREDICTIONS"), isLoading: false });
//           return;
//         } else {
//           this.setState({
//             isLoading: false,
//             prediction: {
//               className: results[0].className,
//               probability: results[0].probability
//             }
//           });
//         }
//       } catch (error) {
//         console.log("Hiyein 4");
//         this.setState({ error, isLoading: false });
//         return;
//       }
//     }
//     async componentDidMount() {
//       if (this.props.renderImage) {
//         await this.predict();
//       }
//     }
//     async componentDidUpdate(prevProps) {
//       if (prevProps.renderImage !== this.props.renderImage) {
//         await this.predict();
//       }
//     }
//     render() {
//       return (
//         <div>
//           <div>
//             The MobileNet model labeled this as{" "}
//             <pre>{this.state.prediction.className}</pre>
//             with a confidence of <pre>{this.state.prediction.probability}</pre>
//           </div>
//           <pre>isLoading : {JSON.stringify(this.state.isLoading)}</pre>
//           <pre>
//             error : {JSON.stringify(this.state.error, null, 2)}{" "}
//             {this.state.error !== null && this.state.error.message}
//           </pre>
//           {this.props.renderImage !== null &&
//             this.props.renderImage({ ref: this.imageRef })}
//         </div>
//       );
//     }
//   }

export default VideoInput;