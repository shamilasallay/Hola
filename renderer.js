// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const webcamjs = require('webcamjs');
const fs = require('fs');
var $ = global.jQuery = require('./jquery.min');

const { ipcRenderer, ipcMain, remote } = require('electron');


webcamjs.set({ width: 320, height: 240 });
webcamjs.attach('#my_camera');
const cameraEl = document.getElementById('my_camera');
const videoEl = document.querySelector('#my_camera video');
let isFrozen = false;

let bubbleclicked = false;
const defaultMessage = "Hola!!! I'm here to talk with you!!!";
let talkEmojiInterval;


$(document).ready(function () {
  console.log('start')
  $(function () {
    setEmoji('happy')
    talkEmoji(defaultMessage, true)
  });
  $("#bubble").click(function () {
    $("#bubble").hide();
    bubbleclicked = true;
  });
});

function setEmoji(expression) {
  var emojis = [expression];
  $("#emoji-div").emoji({ emojis: emojis, width: '150px', animation: 'shake-chunk' });
}

function showbubble(showBubble) {
  // if (showBubble) {
  if ($('#bubble').is(":visible")) {
    $("#bubble").hide();
    talkEmoji(defaultMessage, false)
  }
  else if ($('#bubble').is(":hidden") && bubbleclicked) {
    $("#bubble").hide();
    bubbleclicked = false;
    talkEmoji(defaultMessage, false)
  }
  else if ($('#bubble').is(":hidden") && bubbleclicked == false) {
    $("#bubble").show();
    talkEmoji(defaultMessage, true)
  }
  // }
  // else {
  //   $("#bubble").hide();
  // }

}

setInterval(() => {
  takeSnap();
  showbubble();
}, 10000);

function takeSnap() {
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

$('#emoji-div').on('click', function (event) {
  // console.log('ssssss ',event)
  // if(event.target != this){
  //   console.log('aa')
  // }
  // else{
  //   console.log('bb')
  // }
  showbubble(false);
  ipcRenderer.send('open-new-window', 'chatbot');
})

// ipcMain.on('show-bubble', (event) => {
//   showbubble(true)
// });

function talkEmoji(message, talk) {
    const delay = 200;
    const emojiMap = {
      "openmouth": ["o", "e"],
      "meh": ["b", "p", "m"],
      "slightsmile": ["c", "g", "j", "k", "n", "r", "s", "t", "v", "x", "z", "sh"],
      "astonish": ["d", "l", "th"],
      "hushedface": ["q", "u", "w", "y"],
      "griningface": ["a", "i"],
      "frowning": []
    }
    const defaultEmoji = "meh";
    if(talk){
    talkEmojiInterval = setInterval(function () {
        const character = message.toLowerCase()[Math.floor(new Date / delay) % (message.length + 1)];
        setEmoji(Object.keys(emojiMap).find(emoji => emojiMap[emoji].includes(character)) || defaultEmoji)
        document.getElementById("bubbleTalkId").innerHTML = message.substr(0, Math.floor(new Date / delay)%(message.length+1));
    },delay)
  }
  else{
    clearInterval(talkEmojiInterval)
  }
}





