const $ = require('jquery')

function getEmotion(data_uri) {
	return new Promise((resolve, reject) => {
		console.log("data_uri ",data_uri);
		callEmotionApi(data_uri).then(data => {
			console.log("data ",data);
			sortEmotion(data[0]['faceAttributes']['emotion'])
				.then((emotion) => {
					if (emotion == 'anger') {
						resolve('angry')
					}
					if (emotion == 'contempt') {
						resolve('contempt')
					}
					if (emotion == 'disgust') {
						resolve('disgust')
					}
					if (emotion == 'fear') {
						resolve('fear')
					}
					if (emotion == 'happiness') {
						resolve('happiness')
					}
					if (emotion == 'neutral') {
						resolve('happy')
					}
					if (emotion == 'sadness') {
						resolve('crying')
					}
					if (emotion == 'surprise') {
						resolve('surprise')
					}
					else {
						resolve('kissing')
					}
				})
				.catch(error => {
					reject(error)
				})
		})
			.catch(error => {
				reject(error)
			})
	});
}

function callEmotionApi(data_uri) {
	var subscriptionKey = "9ae4565341d84e2b886ac0665336b530";

	var uriBase =
		"https://deepmoji.cognitiveservices.azure.com/face/v1.0/detect";

	// Request parameters.
	var params = {
		"returnFaceId": "true",
		"returnFaceLandmarks": "false",
		"returnFaceAttributes":"emotion"
	};
	return new Promise((resolve, reject) => {
		$.ajax({
			url: uriBase + '?' + $.param(params),
			type: 'POST',
			processData: false,
			contentType: 'application/octet-stream',
			beforeSend: function (xhrObj) {
				// xhrObj.setRequestHeader("Content-Type", "application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
			data: makeblob(data_uri),
			success: function (data) {
				resolve(data)
			},
			error: function (error) {
				reject(error)
			},
		})
	})
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

function sortEmotion(jsonOb) {
	return new Promise((resolve) => {
		var arrObj = [];

		for (a in jsonOb) {
			arrObj.push([a, jsonOb[a]])
		}
		arrObj.sort(function (a, b) { return a[1] - b[1] });
		arrObj.reverse();

		let emotion = arrObj[0][0]
		resolve(emotion);
	});
}