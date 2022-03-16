leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1="";
song2="";
slw=0;
srw=0;
point2="";

function preload() {
    song1=loadSound("Upwind.mp3");
    song2=loadSound("Courtesy_Call.mp3");

}

function setup() {
    canvas=createCanvas(600 , 500);
    canvas.center();
    //camera
    video = createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses );
}

function modelLoaded() {
    console.log("Model Loaded!")
}

function gotPoses(results) {
    if (results.length > 0) {
     console.log(results);
     leftWristX=results[0].pose.leftWrist.x;
     leftWristY=results[0].pose.leftWrist.y;
     rightWristX=results[0].pose.rightWrist.x;
     rightWristY=results[0].pose.rightWrist.y;
     slw=results[0].pose.keypoints[9].score;
     srw=results[0].pose.keypoints[10].score;
     console.log("Left wrist y="+leftWristY);
     console.log("Left wrist x="+leftWristX);
     console.log("Right wrist x="+rightWristX);
     console.log("Right wrist y="+rightWristY);
    }
}

function draw() {
    image(video , 0 , 0 , 600 , 500)
    //left wrist
    point2=song1.isPlaying();
    stroke('#FF0000');
    fill("#FF0000");
    if (slw > 0.2) {
    circle(leftWristX , leftWristY , 20)    
    song2.stop();
    }
    if (point2 == false) {
      
       
        song1.play()
        document.getElementById("song").innerHTML="Song: Courtesy Call";
    }
    //right wrist
  point1= song2.isPlaying();
  
    stroke('#FF0000');
    fill("#FF0000");
    if (srw > 0.2) {
        circle(rightWristX , rightWristY , 20)    
    song1.stop();
    }
    if (point1 == false) {
        
        song2.play();
        document.getElementById("song").innerHTML="Song: Upwind";
    }
}