let ul = document.getElementById('conversation');

const chatUrl = "http://localhost:5005/webhooks/rest/webhook";
let chat = document.getElementById("chat-container");
let input = document.getElementById("chat-input");

$('#sendBtn').on('click', function (event) {
  send();
})

function send() {
  let message = document.getElementById('chat-input').value;
  if (message != '') {
      createSender(message);
      document.getElementById('typing').style.display = "inline";
      respond(message);
  }
}

function createSender(msg) {
  let li = document.createElement('li');
  li.appendChild(document.createTextNode(msg));
  li.className = "sender"
  ul.appendChild(li);
  document.getElementById('chat-input').value = "";
  chat.scrollTop = chat.scrollHeight;
}

function respond(msg) {
  let data = {
    "sender":"Me",
    "message":msg
  }
  console.log("data ",data);
  fetch(`${chatUrl}/`, {
      method: 'POST',
      body: JSON.stringify(data)
  })
      .then(function (response) {
          document.getElementById('typing').style.display = "none";
          return response.json();
      })
      .then(function (responses) {
          console.log(responses);
          if (responses) {
              for (let response of responses) {
                  createResponder(response.text);
          }
          } else {
              createResponder("Sorry, I'm having trouble understanding you, try asking me in an other way")
          }

      })
      .catch(function (err) {
          document.getElementById('typing').style.display = "none";
          createResponder("I'm having some technical issues. Try again later :)");
      });
}

function createResponder(msg) {
    let li = document.createElement('li');
    li.innerHTML = msg;
    if (voice() == true)
        speak(li.innerText);
    li.className = 'responder';
    ul.appendChild(li)
    chat.scrollTop = chat.scrollHeight;
}

//mic

function voice() {
    let speaker = document.getElementById('voice').checked;
    if (speaker == true)
        return true;
    else
        return false;
}

//speak

function speak(msg) {
    var speech = new SpeechSynthesisUtterance(msg);
    speech.voice = speechSynthesis.getVoices()[1];
    window.speechSynthesis.speak(speech);
}

//record

// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// var MicrophoneStream = require('microphone-stream');

// var micStream = new MicrophoneStream();


// const speechToText = new SpeechToTextV1({
//   authenticator: new IamAuthenticator({
//     apikey: 'dXgMemHRuMZdO_Djjj4qdJFWWTV_yHP8WDSKhWA0okSp',
//   }),
//   url: 'https://stream.watsonplatform.net/speech-to-text/api/',
// });




