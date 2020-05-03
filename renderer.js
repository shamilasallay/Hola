// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const webcamjs = require('webcamjs');
const fs = require('fs');
var $ = global.jQuery = require('./jquery.min');



webcamjs.set({width: 320, height: 240});
webcamjs.attach('#my_camera');
const cameraEl = document.getElementById('my_camera');
const videoEl = document.querySelector('#my_camera video');
let isFrozen = false;

$(document).ready(function(){ 
    console.log('aaxxxx')
    $(function () {
            var emojis = ['happy'];
            //$("#emoji-div").emoji({ value: 4 });
            $("#emoji-div").emoji({ emojis: emojis, width: '150px', animation: 'shake-chunk' });
        });
 });


setInterval(() => {
      console.log('ddddddd')
    //   takeSnap();
  	}, 10000);


function takeSnap(){
  //validation
  // if(isFrozen){
  //   webcamjs.unfreeze();
  //   videoEl.style.display = 'block';
  //   isFrozen = false;
  // }
  webcamjs.snap(function (data_uri) {
    console.log('aaa ',data_uri)
    getEmotion(data_uri);

  });
    // webcamjs.freeze();
    // videoEl.style.display = 'none';
    // let canvas = window.document.querySelector('canvas');

    // canvas.getContext('2d').drawImage(videoEl, 0, 0, 320, 240);
    // let photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    // savePhoto(photoData). then(() => {
    //   getEmotion();
    // });
    // isFrozen = false;
    // webcamjs.unfreeze();
  
}

// async function savePhoto (photoData) {
//   console.log('dsdasd')
//   let filePath = 'face.png'
//   if (photoData) {
//     fs.writeFile(filePath, photoData, 'base64', (err) => {
//       if (err) alert(`There was a problem saving the photo: ${err.message}`);
//       photoData = null;
//     });
//   }
// }



