var videoShow = require("videoshow");
const concat = require('ffmpeg-concat')

var images = [
    {
      path: "./images/image1.png",
      caption:"This is the first pic",
      loop:5
    },
    {
      path: "./images/image2.png",
      caption:"This is the second image",
      loop:2
    },
    {
      path: "./images/image3.png",
      caption:"This is the third image"
    },
  ];

  var videoOptions = {
    loop: 5,
    fps: 25,
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    videoCodec: "libx264",
    size: "640x?",
    audioBitrate: "128k",
    audioChannels: 2,
    format: "mp4",
    pixelFormat: "yuv420p",
  };

 videoShow(images,videoOptions)
  .audio("test.mp3")
.save("slideshow.mp4")
.on('start',function(command){
    console.log("Conversion started" + command)
})
.on('error',function(err,stdout,stderr){
    console.log("Some error occured" + err)
})
.on('end',function(output){
    console.log("Conversion completed" + output)
    finalFunc();
})



// concat 2 mp4s together using 2 500ms directionalWipe transitions
const finalFunc = async() => {
    await concat({
        output: 'test.mp4',
        videos: [
          'videoplayback.mp4',
          'slideshow.mp4',
          
        ],
        transition: {
          name: 'directionalWipe',
          duration: 500
        }
      })
}
