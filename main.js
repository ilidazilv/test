'use strict';
if(!window.location.href.includes('scroll.html')){
localStorage.clear();
}

function getImage(url, imgId, nextId){
    // Create XHR, BlobBuilder and FileReader objects
    var xhr = new XMLHttpRequest(),
        blob,
        fileReader = new FileReader();

// Set the responseType to arraybuffer. "blob" is an option too, rendering BlobBuilder unnecessary, but the support for "blob" is not widespread enough yet
    xhr.open ("GET", url, true);
    xhr.responseType    = "arraybuffer";
    let tmp = document.getElementById('tmp');
    let localImg = document.getElementById('localImg');


    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            // Create a blob from the response

            blob = new Blob([xhr.response], {type: "image/png"});

            // onload needed since Google Chrome doesn't support addEventListener for FileReader
            fileReader.onload = function (evt) {
                // Read out file contents as a Data URL
                var result = evt.target.result;
                // Set image src to Data URL
                tmp.setAttribute("src", result);
                tmp.style.display = 'none';
                // Store Data URL in localStorage
                try {
                    localStorage.setItem(imgId, result);
                }
                catch (e) {
                    alert('Error: ' + e);
                }
                if(nextId){
                  let nextIdEl = document.getElementById(nextId);
                  nextIdEl.style.display = 'block';
                }

            };
            // Load blob as Data URL
            fileReader.readAsDataURL(blob);
        } else {
          alert('XHR error')
        }
    }, false);

// Send XHR
    xhr.send(null);

}

function getImages(){
  let xhrImg = document.getElementById('xhrImg'),
      xhrImg2 = document.getElementById('xhrImg2'),
      xhrImg3 = document.getElementById('xhrImg3');

  if(localStorage.getItem('xhrImg') && localStorage.getItem('xhrImg2') && localStorage.getItem('xhrImg3')){
    document.location.replace('scroll.html');

  } else  {
    document.getElementsByClassName('alertContainer')[0].style.display = 'block';
  }
}
function getImagesSP(){
  let xhrImg = document.getElementById('xhrImg'),
      xhrImg2 = document.getElementById('xhrImg2'),
      xhrImg3 = document.getElementById('xhrImg3');
      xhrImg.setAttribute('src', localStorage.getItem('xhrImg'));
      xhrImg2.setAttribute('src', localStorage.getItem('xhrImg2'));
      xhrImg3.setAttribute('src', localStorage.getItem('xhrImg3'));
}
