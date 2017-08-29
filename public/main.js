var $ = document.querySelector.bind(document);
var formData = new FormData();

var input = $('#file');
var submitBtn = $('button[type=submit]');

function handleFileInput (evt) {
  var file = evt.target.value;
  // Chrome returns a path instead of the filename. We grab the filename out of it.
  var fileName = (~file.indexOf('\\')) ? file.match(/\\([^\\]+)$/)[1] : file;

  $('input[name=file-name]').value = fileName;

  formData.set('file', input.files[0]);

  toggleUploadButton();
}

function handleFileUpload (evt) {
  if (formData.get('file')) {
    toggleUploadButton();

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(data => {
      $('.result').style.display = 'block';
      $('.response').innerHTML = JSON.stringify(data);
      submitBtn.innerHTML = 'Done!';
    })
    .catch(() => {
      console.log('An error occured.');
    });
  }
}

function toggleUploadButton () {
  if (submitBtn.hasAttribute('disabled')) {
    submitBtn.innerHTML = 'Upload';
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.innerHTML = 'Uploading...';
    submitBtn.setAttribute('disabled', 'disabled');
  }
}

input.addEventListener('change', handleFileInput);
submitBtn.addEventListener('click', handleFileUpload);
