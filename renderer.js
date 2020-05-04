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
    $(function () {
            setEmoji('happy')
        });
 });

 function setEmoji(expression) {
    var emojis = [expression];
    $("#emoji-div").emoji({ emojis: emojis, width: '150px', animation: 'shake-chunk' });
 }


setInterval(() => {
      takeSnap();
  	}, 10000);


function takeSnap(){
  webcamjs.snap(function (data_uri) {
    getEmotion(data_uri).then((expression) => {
        setEmoji(expression)
    })
    .catch(error => {
        reject(error)
        setEmoji('wink')
    })
  });
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



