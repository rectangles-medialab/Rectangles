class Coordinate {
    _x
    _y

    constructor(x,y) {
        this._x = x
        this._y = y
    }
}

class Pose {
    _pose = {}
    // nose = {Coordinate}
    // leftEye = {Coordinate}
    // rightEye = {Coordinate}
    // leftEar = {Coordinate}
    // rightEar = {Coordinate}
    // leftShoulder = {Coordinate}
    // rightShoulder = {Coordinate}
    // leftElbow = {Coordinate}
    // rightElbow = {Coordinate}
    // leftWrist = {Coordinate}
    // rightWrist = {Coordinate}
    // leftHip = {Coordinate}
    // rightHip = {Coordinate}
    // leftKnee = {Coordinate}
    // rightKnee = {Coordinate}
    // leftAnkle = {Coordinate}
    // rightAnkle = {Coordinate}


    constructor(pose) {
        this._pose = pose
        // this.nose = pose.nose
        // this.leftEye = pose.leftEye
        // this.rightEye = pose.rightEye
        // this.leftEar = pose.leftEar
        // this.rightEar = pose.rightEar
        // this.leftShoulder = pose.leftShoulder
        // this.rightShoulder = pose.rightShoulder
        // this.leftElbow = pose.leftElbow
        // this.rightElbow = pose.rightElbow
        // this.leftWrist = pose.leftWrist
        // this.rightWrist = pose.rightWrist
        // this.leftHip = pose.leftHip
        // this.rightHip = pose.rightHip
        // this.leftKnee = pose.leftKnee
        // this.rightKnee = pose.rightKnee
        // this.leftAnkle = pose.leftAnkle
        // this.rightAnkle = pose.rightAnkle

    }
}

export default Pose;

