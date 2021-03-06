
/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}

function validateResponse(response) {
	if(!response.ok) {
		throw Error(response.statusText());
	}else {
		return response;
	}
}


function parseJSON(jsonData) {
	return jsonData.json();
}

function domJsonInclude(content) {
	const jsonViewer = document.getElementById('json-content');
	jsonViewer.innerHTML = JSON.stringify(content);
	jsonViewer.classList.add('prettyprint');
	jsonViewer.parentNode.style.cssText = 'display:block';
	jsonViewer.style.cssText = 'display:block';
	PR.prettyPrint();
}

function showImage(responsePicture) {
	const container = document.getElementById('img-container');
	const img      	= document.createElement('img');
	container.appendChild(img);
	img.src = URL.createObjectURL(responsePicture);
}

function showText(text){
	const message = document.getElementById('message');
	message.innerHTML = text;
	message.style.cssText   = 'display:block';
	message.parentNode.style.cssText = 'display:block';
}

function responseAsBlob(responsePicture) {
	return responsePicture.blob();
}


function responseText(responseText){
	return responseText.text();
}

function logSize(responseText) {
	let url  = responseText.url;
	let size = responseText.headers.get('content-length');
	console.log(`The URL: ${url} has a size of ${size} bytes.`);
}

// Fetch JSON ----------

function fetchJSON() {
  fetch('examples/animals.json')
  .then(validateResponse)
  .then(parseJSON)
  .then(domJsonInclude)
  .catch(logError)
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------

function fetchImage() {
  fetch('examples/fetching.jpg')
  .then(validateResponse)
  .then(responseAsBlob)
  .then(showImage)
  .catch(logError)
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------

function fetchText() {
  fetch('examples/words.txt')
  .then(validateResponse)
  .then(responseText)
  .then(showText)
  .catch(logError)
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// HEAD request ----------

function headRequest() {
  fetch('examples/words.txt',{method: 'HEAD'})
  .then(validateResponse)
  .then(logSize)
  .catch(logError)
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
  const formData = new FormData(document.getElementById('msg-form'))
  fetch('http://localhost:5000/', {
  	method: 'POST',
  	body: formData
  }).then(validateResponse)
  .then(responseText)
  .then(showText)
  .catch(logError)
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);
