const $ = require('jquery')

function getEmotion(data_uri){
    console.log('aa')

    console.log(__dirname+'/face.png')

    sourceImageUrl = __dirname+'/face.png';

    var subscriptionKey = "2f17b5e81f1a443d8c16614410225e1c";

		var uriBase =
			"https://deepmojidesktoppartner.cognitiveservices.azure.com/face/v1.0/detect";

		// Request parameters.
		var params = {
			"returnFaceId": "true",
			"returnFaceLandmarks": "false",
			"returnFaceAttributes":
				"age,gender,headPose,smile,facialHair,glasses,emotion," +
				"hair,makeup,occlusion,accessories,blur,exposure,noise"
		};

		$.ajax({
			url: uriBase+'?' + $.param(params),
			type: 'POST',
			processData: false,
			contentType: 'application/octet-stream',
			beforeSend: function (xhrObj) {
				// xhrObj.setRequestHeader("Content-Type", "application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
			data: makeblob(data_uri),
		})
			.done(function (data) {
				alert("success");
				console.log(data)
				// $("#responseTextArea").val(JSON.stringify(data, null, 2));
			})
			.fail(function () { alert("error"); });

  }

  makeblob = function (dataURL) {
	var BASE64_MARKER = ';base64,';
	if (dataURL.indexOf(BASE64_MARKER) == -1) {
		var parts = dataURL.split(',');
		var contentType = parts[0].split(':')[1];
		var raw = decodeURIComponent(parts[1]);
		return new Blob([raw], { type: contentType });
	}
	var parts = dataURL.split(BASE64_MARKER);
	var contentType = parts[0].split(':')[1];
	var raw = window.atob(parts[1]);
	var rawLength = raw.length;

	var uInt8Array = new Uint8Array(rawLength);

	for (var i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}

	return new Blob([uInt8Array], { type: contentType });
}